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
    $serviceCategoriesTable = $wpdb->prefix . "pwf_service_categories";
    if (is_user_logged_in() && (in_array( 'administrator', (array) $user->roles ) )){ //will change user roles
        $now = date('Y-m-d H:i:s');
        $newService = [];
        $newService['servicename'] = $serviceName;
        $newService['servicedescription'] = $serviceDescription;
        $newService['priceballpark'] = $servicePrice;
        $newService['timeframe'] = $serviceTimeframe;
        $newService['typeid'] = $serviceType;
        $newService['postedby'] = $provider;
        $newService['createdate'] = $now;
        $newService['isRequest'] = false;
        $wpdb->insert($servicesTable, $newService);
        $newServiceId = $wpdb->insert_id;
        if ($newServiceId > 0){
            $categories = explode(',', trim(sanitize_text_field($data['categories']), '[]'));
            if (count($categories) > 0){
                $query = 'INSERT INTO %i (serviceid, categoryid, createdate) value';
                foreach ($categories as $category){
                    if (is_numeric($category)){
                        $values = '(' . $newServiceId . ', ' . $category . ', "' . $now . '"), ';
                        $query .= $values;
                    }
                }
                $query = rtrim($query, ', ');
                $wpdb->query($wpdb->prepare($query, $serviceCategoriesTable));
            }
            return 'success';
        } else {
            return 'fail';
        }
    } else {
        wp_safe_redirect(site_url('/my-account'));
        return 'fail';
    }
}