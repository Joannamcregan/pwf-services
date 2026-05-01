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
        this.categoriesError = $('#pwf-new-service-error--categories');
        this.categoryButtons = $('.pwf-new-service-category-span');
        this.events();
    }
    events(){
        this.servicesSubmissionButton.on('click', this.submit.bind(this, 'services'));
        this.categoryButtons.on('click', this.toggleCategories.bind(this));
    }    
    toggleCategories(e){
        if ($(e.target).hasClass('pwf-category-span-selected')){
            $(e.target).removeClass('pwf-category-span-selected');
            $(e.target).attr('aria-label', $(e.target).text() + ' is not selected');
            this.categoriesError.addClass('hidden');
        } else {
            if ($('.pwf-category-span-selected').length < 3){
                $(e.target).addClass('pwf-category-span-selected');
                $(e.target).attr('aria-label', $(e.target).text() + ' is selected');
                this.categoriesError.addClass('hidden');
            } else {
                this.categoriesError.removeClass('hidden');
            }
        }
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
            let selectedCategories = [];
            $('.pwf-category-span-selected').each(function(){
                selectedCategories.push($(this).data('id'));
            })
            $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', pwfData.nonce);
            },
            url: pwfData.root_url + '/wp-json/pwfSubmit/v1/addService',
            type: 'POST',
            data: {
                'serviceName' : serviceName,
                'serviceDescription' : serviceDescription,
                'servicePrice' : servicePrice,
                'serviceTimeframe' : serviceTimeframe,
                'serviceType' : serviceType,
                'provider' : provider,
                'categories' : JSON.stringify(selectedCategories)
            },
            success: (response) => {
                this.serviceNameInput.val('');
                this.serviceDescriptionInput.val('');
                this.servicePriceInput.val('');
                this.serviceTimeframeInput.val('');
                this.categoryButtons.each(function(){
                    $(this).removeClass('pwf-category-span-selected');
                })
            },
            error: (response) => {
                console.log(response);
            }
        })
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