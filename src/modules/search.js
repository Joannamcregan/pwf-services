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
        this.isPreview = true;
        window.onload = this.addBehavior();
    }
    events(){
        this.servicesSearchSubmit.on('click', this.searchServices.bind(this));
        this.categorySpans.on('click', this.browseRequests.bind(this));
    }
    browseRequests(e){
        this.isPreview = ($(e.target).data('preview') > 0);
        this.categorySpans.removeClass('pwf-category-span-selected');
        $(e.target).addClass('pwf-category-span-selected');
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
                    this.servicesResultsSection.html("<p class='initial-message'>Sorry! We couldn't find any matching results.</p>");
                } else {
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
        let resultDiv = $('<div />').addClass('pwf-service-search-result');
        let resultTitle = $('<h2 />').html(this.resultsArr[i]['servicename']);
        resultDiv.append(resultTitle);
        let rawDescription = this.resultsArr[i]['servicedescription'];
        let trimmedDescription = rawDescription.substr(0, 500);
        trimmedDescription = trimmedDescription.length < rawDescription.length ? trimmedDescription.substr(0, Math.min(trimmedDescription.length, trimmedDescription.lastIndexOf(" "))) : trimmedDescription;
        trimmedDescription += trimmedDescription.length < rawDescription.length ? '...' : '';
        let resultDescription = $('<p />').html(trimmedDescription);
        resultDiv.append(resultDescription);
        if (this.isPreview){
            let loginP = $('<p />').addClass('search-results-login');
            let siteRoot = window.location.origin;
            let loginA = $('<a />').attr('href', siteRoot + '/wp-login.php').html('login for full details');
            loginP.append(loginA);
            resultDiv.append(loginP);
        } else {
            // append ballpark cost, time frame, and link to author page
            let loginP = $('<p />').addClass('search-results-login').html('yay, you are logged in!');
            resultDiv.append(loginP);
        }
        resultsSection.append($(resultDiv));
        this.alreadyAdded.push(this.resultsArr[i]['id']);
    }
    addResultBatch(resultsSection){
        if (this.resultsArr.length <= parseInt(this.batchCounter, 10) + parseInt(this.batchInterval, 10)){
            for(let i = this.batchCounter; i < this.resultsArr.length; i++){
                if (this.resultsArr[i]['found_in'] == 'title'){
                    this.addResult(i, resultsSection);
                } else {
                    if ($.inArray(this.resultsArr[i]['id'], this.alreadyAdded) == -1){
                        this.addResult(i, resultsSection);
                    }
                }
            }
        } else {
            for(let i = this.batchCounter; i < parseInt(this.batchCounter, 10) + parseInt(this.batchInterval, 10); i++){
                if (this.resultsArr[i]['found_in'] == 'title'){
                    this.addResult(i);
                } else {
                    if ($.inArray(this.resultsArr[i]['id'], this.alreadyAdded) == -1){
                        this.addResult(i);
                    }
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
        this.isPreview = (this.servicesSearchSubmit.data('preview') > 0);
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