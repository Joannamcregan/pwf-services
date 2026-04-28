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
        this.noServiceNameError = $('#pwf-new-service-error--name');
        this.noServiceDescriptionError = $('#pwf-new-service-error--description');
        this.noServicePriceError = $('#pwf-new-service-error--price');
        this.noServiceTimeframeError = $('#pwf-new-service-error--timeframe');
        this.events();
    }
    events(){
        this.servicesSubmissionButton.on('click', this.submit.bind(this, 'services'));
    }    
    submit(path){
        let serviceName = this.serviceNameInput.val();
        let serviceDescription = this.serviceDescriptionInput.val();
        let servicePrice = this.servicePriceInput.val();
        let serviceTimeframe = this.serviceTimeframeInput.val();
        let serviceType = this.serviceTypeInput.find(":selected").data('id');
        let provider = $('#pwf-new-service-provider').find(":selected").data('id');
        if (serviceName != '' && serviceDescription != '' && servicePrice != '' && serviceTimeframe != ''){
            this.noServiceNameError.addClass('hidden');
            this.noServiceDescriptionError.addClass('hidden');
            this.noServicePriceError.addClass('hidden');
            this.noServiceTimeframeError.addClass('hidden');
        } else {
            if (serviceName == ''){
                this.noServiceNameError.removeClass('hidden');
            } else {
                this.noServiceNameError.addClass('hidden');
            }
            if (serviceDescription == ''){
                this.noServiceDescriptionError.removeClass('hidden');
            } else {
                this.noServiceDescriptionError.addClass('hidden');
            }
            if (servicePrice == ''){
                this.noServicePriceError.removeClass('hidden');
            } else {
                this.noServicePriceError.addClass('hidden');
            }
            if (serviceTimeframe == ''){
                this.noServiceTimeframeError.removeClass('hidden');
            } else {
                this.noServiceTimeframeError.addClass('hidden');
            }
        }
    }
}

export default Submission;