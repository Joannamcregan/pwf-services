import $ from 'jquery';

class Search{
    constructor(){
        this.servicesSearchField = $('#pwf-services-search-field');
        this.servicesSearchSubmit = $('#pwf-services-search-submit');
        this.servicesSearchSubmitPreview = $('#pwf-services-search-submit--preview');
        this.servicesResultsSection = $('#pwf-services-search-results');
        this.servicesSearchTermError = $('#pwf-search-term-error');
        this.events();
    }
    events(){
        this.servicesSearchSubmitPreview.on('click', this.searchServicePreviews.bind(this));
    }
    searchServicePreviews(){
        console.log('called');
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
                    console.log(response)
                    let alreadyAdded = [];
                    if(response.length < 1){
                        this.servicesResultsSection.html("<p class='centered-text'>Sorry! We couldn't find any matching results.</p>");
                    } else {
                        for(let i = 0; i < response.length; i++){
                            if (response[i]['found_in'] == 'title'){
                                let resultDiv = $('<div />').addClass('pwf-service-search-result');
                                let resultTitle = $('<h2 />').html(response[i]['servicename']);
                                resultDiv.append(resultTitle);
                                let rawDescription = response[i]['servicedescription'];
                                let trimmedDescription = rawDescription.substr(0, 500);
                                trimmedDescription = trimmedDescription.length < rawDescription.length ? trimmedDescription.substr(0, Math.min(trimmedDescription.length, trimmedDescription.lastIndexOf(" "))) : trimmedDescription;
                                trimmedDescription += trimmedDescription.length < rawDescription.length ? '...' : '';
                                let resultDescription = $('<p />').html(trimmedDescription);
                                resultDiv.append(resultDescription);
                                let loginP = $('<p />').addClass('search-results-login').html('login for full details');
                                resultDiv.append(loginP);
                                this.servicesResultsSection.append(resultDiv);
                                alreadyAdded.push(response[i]['id']);
                            } else {
                                if ($.inArray(response[i]['id'], alreadyAdded) == -1){
                                    let resultDiv = $('<div />').addClass('pwf-service-search-result');
                                    let resultTitle = $('<h2 />').html(response[i]['servicename']);
                                    resultDiv.append(resultTitle);
                                    let rawDescription = response[i]['servicedescription'];
                                    let trimmedDescription = rawDescription.substr(0, 500);
                                    trimmedDescription = trimmedDescription.length < rawDescription.length ? trimmedDescription.substr(0, Math.min(trimmedDescription.length, trimmedDescription.lastIndexOf(" "))) : trimmedDescription;
                                    trimmedDescription += trimmedDescription.length < rawDescription.length ? '...' : '';
                                    let resultDescription = $('<p />').html(trimmedDescription);
                                    resultDiv.append(resultDescription);
                                    let loginP = $('<p />').addClass('search-results-login').html('login for full details');
                                    resultDiv.append(loginP);
                                    this.servicesResultsSection.append(resultDiv);
                                    alreadyAdded.push(response[i][id]);
                                }
                            }
                        }
                    }
                },
                error: (response) => {
                    console.log(response);
                }
            })
        }
    }
}

export default Search;