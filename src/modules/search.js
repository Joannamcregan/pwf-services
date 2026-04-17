import $ from 'jquery';
import { load } from 'mime';

class Search{
    constructor(){
        this.servicesSearchField = $('#pwf-services-search-field');
        this.servicesSearchSubmit = $('#pwf-services-search-submit');
        this.servicesSearchSubmitPreview = $('#pwf-services-search-submit--preview');
        this.servicesResultsSection = $('#pwf-services-search-results');
        this.servicesSearchTermError = $('#pwf-search-term-error');
        this.loadMoreDiv = $('#load-more');
        this.events();
        this.resultsArr;
        this.alreadyAdded = [];
        this.batchInterval = 3;
        this.batchCounter = 0;
        this.moreResults = false;
        window.onload = this.addBehavior();
    }
    events(){
        this.servicesSearchSubmitPreview.on('click', this.searchServicePreviews.bind(this));
    }
    elementInView(el){
        let windowHeight = window.innerHeight || document.documentElement.clientHeight;
        let elementRect = el.get(0).getBoundingClientRect();
        return (elementRect.bottom <= windowHeight + 100);
    };
    addResult(i){
        let resultDiv = $('<div />').addClass('pwf-service-search-result');
        let resultTitle = $('<h2 />').html(this.resultsArr[i]['servicename']);
        resultDiv.append(resultTitle);
        let rawDescription = this.resultsArr[i]['servicedescription'];
        let trimmedDescription = rawDescription.substr(0, 500);
        trimmedDescription = trimmedDescription.length < rawDescription.length ? trimmedDescription.substr(0, Math.min(trimmedDescription.length, trimmedDescription.lastIndexOf(" "))) : trimmedDescription;
        trimmedDescription += trimmedDescription.length < rawDescription.length ? '...' : '';
        let resultDescription = $('<p />').html(trimmedDescription);
        resultDiv.append(resultDescription);
        let loginP = $('<p />').addClass('search-results-login').html('login for full details');
        resultDiv.append(loginP);
        this.servicesResultsSection.append(resultDiv);
        this.alreadyAdded.push(this.resultsArr[i]['id']);
    }
    addResultBatch(){
        if (this.resultsArr.length <= parseInt(this.batchCounter, 10) + parseInt(this.batchInterval, 10)){
            for(let i = this.batchCounter; i < this.resultsArr.length; i++){
                if (this.resultsArr[i]['found_in'] == 'title'){
                    this.addResult(i);
                } else {
                    if ($.inArray(this.resultsArr[i]['id'], this.alreadyAdded) == -1){
                        this.addResult(i);
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
            this.addResultBatch();
        }
    }
    searchServicePreviews(){
        let searchTerm = this.servicesSearchField.val();
        this.servicesSearchTermError.addClass('hidden');
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
                        this.servicesResultsSection.html("<p class='centered-text'>Sorry! We couldn't find any matching results.</p>");
                    } else {
                        this.addResultBatch(this.resultsArr);
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