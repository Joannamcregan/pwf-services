import $ from 'jquery';

class Submission{
    constructor(){
        this.servicesSubmissionButton = $('#pwf-new-service-submit');
        this.serviceNameInput = $('#pwf-new-service-name');
        this.serviceDescriptionInput = $('#pwf-new-service-description');
        this.servicePriceInput = $('#pwf-new-service-price');
        this.serviceTimeframeInput = $('#pwf-new-service-timeframe');
        this.serviceTypeInput = $('#pwf-new-service-type');
        this.serviceProviderInput = $('#pwf-new-service-provider');
        this.events();
    }
    events(){
        this.servicesSubmissionButton.on('click', this.submit.bind(this, 'services'));
    }    
    submit(path){
        console.log(path);
    }
}

export default Submission;