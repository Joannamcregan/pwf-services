import $ from 'jquery';
import { load } from 'mime';

class Search{
    constructor(){
        this.servicesSearchField = $('#pwf-services-search-field');
        this.servicesSearchSubmit = $('#pwf-services-search-submit');
        this.servicesResultsSection = $('#pwf-services-search-results');
        this.servicesSearchTermError = $('#pwf-search-term-error');
        this.loadMoreDiv = $('.pwf-load-more');
        this.categorySpans = $('.pwf-category-span');
        this.requestsResultsSection = $('#pwf-requests-search-results');
        this.events();
        this.resultsArr;
        this.alreadyAdded = [];
        this.batchInterval = 3;
        this.batchCounter = 0;
        this.moreResults = false;
        window.onload = this.addBehavior();
    }
    events(){
        this.servicesSearchSubmit.on('click', this.searchServices.bind(this));
        this.categorySpans.on('click', this.browseRequests.bind(this));
        this.categorySpans.on('keypress', (e)=>{
            if (e.key === 'Enter'){
                this.browseRequests(e);
            } 
        })
    }
    browseRequests(e){
        this.alreadyAdded = [];
        this.batchCounter = 0;
        this.moreResults = false;
        this.categorySpans.removeClass('pwf-category-span-selected');
        this.categorySpans.each(function(){
            $(this).attr('aria-label', $(this).text() + ' is not selected');
        })
        $(e.target).addClass('pwf-category-span-selected');
        $(e.target).attr('aria-label', $(e.target).text() + ' is selected');
        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', pwfData.nonce);
            },
            url: pwfData.root_url + '/wp-json/pwfSearch/v1/requestBrowse',
            type: 'GET',
            data: {
                'categoryId' : $(e.target).data('id')
            },
            success: (response) => {
                this.resultsArr = response;
                if(this.resultsArr.length < 1){
                    this.requestsResultsSection.html("<p class='initial-message'>Sorry! We couldn't find any matching results.</p>");
                } else {
                    this.requestsResultsSection.html('');
                    this.addResultBatch(this.requestsResultsSection);
                }
            },
            error: (response) => {
                // console.log(response);
            }
        })
    }
    elementInView(el){
        let windowHeight = window.innerHeight || document.documentElement.clientHeight;
        let elementRect = el.get(0).getBoundingClientRect();
        return (elementRect.bottom <= windowHeight + 100);
    };
    addResult(i, resultsSection){
        let siteRoot = window.location.origin;
        let resultDiv = $('<div />').addClass('pwf-service-search-result').attr('tabindex', 0);
        let resultA = $('<a />').attr('href', siteRoot + '/service/?service=' + this.resultsArr[i]['id']);
        let resultTitle = $('<h2 />').html(this.resultsArr[i]['servicename']);
        resultA.append(resultTitle);
        resultDiv.append(resultA);
        let rawDescription = this.resultsArr[i]['servicedescription'];
        let trimmedDescription = rawDescription.substr(0, 200);
        trimmedDescription = trimmedDescription.length < rawDescription.length ? trimmedDescription.substr(0, Math.min(trimmedDescription.length, trimmedDescription.lastIndexOf(" "))) : trimmedDescription;
        trimmedDescription += trimmedDescription.length < rawDescription.length ? '...' : '';
        let resultDescription = $('<p />').html(trimmedDescription);
        resultDiv.append(resultDescription);
        let ballparkStrong = $('<strong />').html('Ballpark pricing: ');
        let ballparkEm = $('<em />').html(this.resultsArr[i]['priceballpark']);
        let resultBallpark = $('<p />').append(ballparkStrong, ballparkEm);
        resultDiv.append(resultBallpark);
        let timeStrong = $('<strong />').html('Approximate time to complete: ');
        let timeEm = $('<em />').html(this.resultsArr[i]['timeframe']);
        let resultTimeframe = $('<p />').append(timeStrong, timeEm);
        resultDiv.append(resultTimeframe);
        resultsSection.append(resultDiv);
        this.alreadyAdded.push(this.resultsArr[i]['id']);
    }
    addResultBatch(resultsSection){
        if (this.resultsArr.length <= parseInt(this.batchCounter, 10) + parseInt(this.batchInterval, 10)){
            for(let i = this.batchCounter; i < this.resultsArr.length; i++){
                // if (this.resultsArr[i]['found_in'] == 'title'){
                //     this.addResult(i, resultsSection);
                // } else {
                //     if ($.inArray(this.resultsArr[i]['id'], this.alreadyAdded) == -1){
                //         this.addResult(i, resultsSection);
                //     }
                // }
                if ($.inArray(this.resultsArr[i]['id'], this.alreadyAdded) == -1){
                    this.addResult(i, resultsSection);
                }
            }
        } else {
            for(let i = this.batchCounter; i < parseInt(this.batchCounter, 10) + parseInt(this.batchInterval, 10); i++){
                // if (this.resultsArr[i]['found_in'] == 'title'){
                //     this.addResult(i, resultsSection);
                // } else {
                //     if ($.inArray(this.resultsArr[i]['id'], this.alreadyAdded) == -1){
                //         this.addResult(i, resultsSection);
                //     }
                // }
                if ($.inArray(this.resultsArr[i]['id'], this.alreadyAdded) == -1){
                    this.addResult(i, resultsSection);
                }
            }
            this.moreResults = true;
            this.batchCounter = this.batchCounter + this.batchInterval;
        }
    }
    loadMoreResults = () => {
        if (this.elementInView(this.loadMoreDiv) && this.moreResults == true) {
            this.moreResults = false;
            this.addResultBatch(this.loadMoreDiv.closest('main').find('.pwf-search-results'));
        }
    }
    searchServices(){
        this.alreadyAdded = [];
        this.batchCounter = 0;
        this.moreResults = false;
        let searchTerm = this.servicesSearchField.val();
        this.servicesSearchTermError.addClass('hidden');
        if (searchTerm.length == 0){
            searchTerm = this.servicesSearchField.attr('placeholder');
        }
        if (searchTerm.length < 3){
            this.servicesSearchTermError.removeClass('hidden');
        } else {
            this.servicesResultsSection.html('');
            $.ajax({
                beforeSend: (xhr) => {
                    xhr.setRequestHeader('X-WP-Nonce', pwfData.nonce);
                },
                url: pwfData.root_url + '/wp-json/pwfSearch/v1/serviceSearch',
                type: 'GET',
                data: {
                    'searchTerm' : searchTerm
                },
                success: (response) => {
                    this.resultsArr = response;
                    if(this.resultsArr.length < 1){
                        this.servicesResultsSection.html("<p class='initial-message'>Sorry! We couldn't find any matching results.</p>");
                    } else {
                        this.servicesResultsSection.html('');
                        this.addResultBatch(this.servicesResultsSection);
                    }
                },
                error: (response) => {
                    // console.log(response);
                }
            })
        }
    }

    addBehavior() {
        let searchFields = $('#pwf-services-search-field');
        searchFields.each(() => {
            window.addEventListener("scroll", () => {
                this.loadMoreResults();
            });
        });
    }

}

export default Search;