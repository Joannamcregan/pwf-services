<?php

add_action('rest_api_init', 'pwfSubmitRoute');

function pwfSubmitRoute() {
    register_rest_route('pwfSubmit/v1', 'addService', array(
        'methods' => 'POST',
        'callback' => 'addService'
    ));
}

function addService($data) {
    $serviceName = sanitize_text_field($data['serviceName']);
    $serviceDescription = sanitize_text_field($data['serviceDescription']);
    $servicePrice = sanitize_text_field($data['servicePrice']);
    $serviceTimeframe = sanitize_text_field($data['serviceTimeframe']);
    $serviceType = sanitize_text_field($data['serviceType']);
    $provider = sanitize_text_field($data['provider']); //will change to the id of the user making request once out of demo mode
    $user = wp_get_current_user();
    global $wpdb;
    $servicesTable = $wpdb->prefix . "pwf_services";
    $serviceTypesTable = $wpdb->prefix . "pwf_service_types";
    if (is_user_logged_in() && (in_array( 'administrator', (array) $user->roles ) )){ //will change user roles
        $newService = [];
        $newService['servicename'] = $serviceName;
        $newService['servicedescription'] = $serviceDescription;
        $newService['priceballpark'] = $servicePrice;
        $newService['timeframe'] = $serviceTimeframe;
        $newService['typeid'] = $serviceType;
        $newService['postedby'] = $provider;
        $newService['createdate'] = date('Y-m-d H:i:s');
        $newService['isRequest'] = 0;
        $wpdb->insert($servicesTable, $newService);
        $newServiceId = $wpdb->insert_id;
        return $newServiceId;
        // return 'success';
    } else {
        wp_safe_redirect(site_url('/my-account'));
        return 'fail';
    }
}