import $ from 'jquery';

class Search{
    constructor(){
        this.servicesSearchField = $('#pwf-services-search-field');
        this.servicesSearchSubmit = $('#pwf-services-search-submit');
        this.servicesResultsSection = $('#pwf-services-search-results');
        this.events();
    }
    events(){
        this.servicesSearchSubmit.on('click', this.searchServices.bind(this));
    }
    searchServices(){
        let searchTerm = this.servicesSearchField.val();
        this.servicesResultsSection.html('');
    }
}

export default Search;