<?php

add_action('rest_api_init', 'pwfSearchRoute');

function pwfSearchRoute() {
    register_rest_route('pwfSearch/v1', 'serviceSearch', array(
        'methods' => 'GET',
        'callback' => 'getServices'
    ));
}

function getServices($data){
    $searchTerm = sanitize_text_field($data['searchTerm']);
    global $wpdb;
    $servicesTable = $wpdb->prefix . "pwf_services";
    $serviceTypesTable = $wpdb->prefix . "pwf_service_types";
    $usersTable = $wpdb->prefix . "users";
    $resultsArr = [];
    $query = 'SELECT services.*, users.display_name FROM %i services 
    JOIN %i types ON services.TYPEID = types.ID
    JOIN %i users ON users.id = services.PROVIDERID
    WHERE services.SERVICENAME LIKE %s';
    $results = $wpdb->get_results($wpdb->prepare($query, $servicesTable, $serviceTypesTable, $usersTable, '%' . $wpdb->esc_like($searchTerm) . '%'), ARRAY_A);
    array_push($resultsArr, ...$results);
    return $resultsArr;
}