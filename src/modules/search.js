import $ from 'jquery';

class Search{
    constructor(){
        this.servicesSearchField = $('#pwf-services-search-field');
        this.servicesSearchSubmit = $('#pwf-services-search-submit');
        this.events();
    }
    events(){
        this.servicesSearchSubmit.on('click', ()=>{
            console.log('searcheddd ittt');
        })
    }
}

export default Search;