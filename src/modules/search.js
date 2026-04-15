import $ from 'jquery';

class Search{
    constructor(){
        this.servicesSearchField = $('#pwf-services-search-field');
        this.servicesSearchSubmit = $('#pwf-services-search-submit');
        this.servicesResultsSection = $('#pwf-services-search-results');
        this.servicesSearchTermError = $('#pwf-search-term-error');
        this.events();
    }
    events(){
        this.servicesSearchSubmit.on('click', this.searchServices.bind(this));
    }
    searchServices(){
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
                    console.log(response);
                },
                error: (response) => {
                    console.log(response);
                }
            })
        }
    }
}

export default Search;