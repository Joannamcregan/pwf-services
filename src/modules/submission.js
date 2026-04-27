import $ from 'jquery';

class Submission{
    constructor(){
        this.servicesSubmissionButton = $('#pwf-new-service-submit');
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