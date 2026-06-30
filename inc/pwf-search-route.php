<?php

add_action('rest_api_init', 'pwfSearchRoute');

function pwfSearchRoute() {
    register_rest_route('pwfSearch/v1', 'serviceSearch', array(
        'methods' => 'GET',
        'callback' => 'getServices'
    ));
    register_rest_route('pwfSearch/v1', 'requestBrowse', array(
        'methods' => 'GET',
        'callback' => 'browseRequests'
    ));
}

function getServices($data){
    $searchTerm = sanitize_text_field($data['searchTerm']);
    $searchTerm = trim($searchTerm);
    $sTrimmedTerm = rtrim($searchTerm, "s");
    $ingTrimmedTerm = str_contains($searchTerm, 'ing') ? substr($searchTerm, 0, -3) : $searchTerm;
    global $wpdb;
    $servicesTable = $wpdb->prefix . "pwf_services";
    $serviceCategoriesTable = $wpdb->prefix . "pwf_service_categories";
    $categoriesTable = $wpdb->prefix . "pwf_categories";
    $usersTable = $wpdb->prefix . "users";
    $resultsArr = [];
    $query = 'SELECT services.id, services.servicename, services.servicedescription, services.priceballpark, services.timeframe, services.postedby, "title" as "found_in", users.display_name as "provider_name" FROM %i services 
    JOIN %i users ON users.id = services.postedby
    WHERE services.SERVICENAME LIKE %s
    AND isrequest = 0';
    $results = $wpdb->get_results($wpdb->prepare($query, $servicesTable, $usersTable, '%' . $wpdb->esc_like($searchTerm) . '%'), ARRAY_A);
    array_push($resultsArr, ...$results);
    
    $query = 'SELECT services.id, services.servicename, services.servicedescription, services.priceballpark, services.timeframe, services.postedby, "title" as "found_in", users.display_name as "provider_name" FROM %i services 
    JOIN %i users ON users.id = services.postedby
    WHERE services.SERVICENAME LIKE %s
    AND isrequest = 0';
    $results = $wpdb->get_results($wpdb->prepare($query, $servicesTable, $usersTable, '%' . $wpdb->esc_like($sTrimmedTerm) . '%'), ARRAY_A);
    array_push($resultsArr, ...$results);
    
    $query = 'SELECT services.id, services.servicename, services.servicedescription, services.priceballpark, services.timeframe, services.postedby, "title" as "found_in", users.display_name as "provider_name" FROM %i services 
    JOIN %i users ON users.id = services.postedby
    WHERE services.SERVICENAME LIKE %s
    AND isrequest = 0';
    $results = $wpdb->get_results($wpdb->prepare($query, $servicesTable, $usersTable, '%' . $wpdb->esc_like($ingTrimmedTerm) . '%'), ARRAY_A);
    array_push($resultsArr, ...$results);

    $query = 'SELECT services.id, services.servicename, services.servicedescription, services.priceballpark, services.timeframe, services.postedby, "description" as "found_in", users.display_name as "provider_name" FROM %i services 
    JOIN %i users ON users.id = services.postedby
    WHERE services.SERVICEDESCRIPTION LIKE %s
    AND isrequest = 0';
    $results = $wpdb->get_results($wpdb->prepare($query, $servicesTable, $usersTable, '%' . $wpdb->esc_like($searchTerm) . '%'), ARRAY_A);
    array_push($resultsArr, ...$results);
    
    $query = 'SELECT services.id, services.servicename, services.servicedescription, services.priceballpark, services.timeframe, services.postedby, "description" as "found_in", users.display_name as "provider_name" FROM %i services 
    JOIN %i users ON users.id = services.postedby
    WHERE services.SERVICEDESCRIPTION LIKE %s
    AND isrequest = 0';
    $results = $wpdb->get_results($wpdb->prepare($query, $servicesTable, $usersTable, '%' . $wpdb->esc_like($sTrimmedTerm) . '%'), ARRAY_A);
    array_push($resultsArr, ...$results);

    $query = 'SELECT services.id, services.servicename, services.servicedescription, services.priceballpark, services.timeframe, services.postedby, "description" as "found_in", users.display_name as "provider_name" FROM %i services 
    JOIN %i users ON users.id = services.postedby
    WHERE services.SERVICEDESCRIPTION LIKE %s
    AND isrequest = 0';
    $results = $wpdb->get_results($wpdb->prepare($query, $servicesTable, $usersTable, '%' . $wpdb->esc_like($ingTrimmedTerm) . '%'), ARRAY_A);
    array_push($resultsArr, ...$results);

    $query = 'SELECT services.id, services.servicename, services.servicedescription, services.priceballpark, services.timeframe, services.postedby, "category" as "found_in", users.display_name as "provider_name" FROM %i services 
    JOIN %i serviceCategories ON services.ID = serviceCategories.serviceID
    JOIN %i categories ON serviceCategories.categoryID = categories.id
    JOIN %i users ON users.id = services.postedby
    WHERE categories.category_name LIKE %s
    AND isrequest = 0';
    $results = $wpdb->get_results($wpdb->prepare($query, $servicesTable, $serviceCategoriesTable, $categoriesTable, $usersTable, '%' . $wpdb->esc_like($searchTerm) . '%'), ARRAY_A);
    array_push($resultsArr, ...$results);

    $query = 'SELECT services.id, services.servicename, services.servicedescription, services.priceballpark, services.timeframe, services.postedby, "category" as "found_in", users.display_name as "provider_name" FROM %i services 
    JOIN %i serviceCategories ON services.ID = serviceCategories.serviceID
    JOIN %i categories ON serviceCategories.categoryID = categories.id
    JOIN %i users ON users.id = services.postedby
    WHERE categories.category_name LIKE %s
    AND isrequest = 0';
    $results = $wpdb->get_results($wpdb->prepare($query, $servicesTable, $serviceCategoriesTable, $categoriesTable, $usersTable, '%' . $wpdb->esc_like($sTrimmedTerm) . '%'), ARRAY_A);
    array_push($resultsArr, ...$results);

    $query = 'SELECT services.id, services.servicename, services.servicedescription, services.priceballpark, services.timeframe, services.postedby, "category" as "found_in", users.display_name as "provider_name" FROM %i services 
    JOIN %i serviceCategories ON services.ID = serviceCategories.serviceID
    JOIN %i categories ON serviceCategories.categoryID = categories.id
    JOIN %i users ON users.id = services.postedby
    WHERE categories.category_name LIKE %s
    AND isrequest = 0';
    $results = $wpdb->get_results($wpdb->prepare($query, $servicesTable, $serviceCategoriesTable, $categoriesTable, $usersTable, '%' . $wpdb->esc_like($ingTrimmedTerm) . '%'), ARRAY_A);
    array_push($resultsArr, ...$results);

    return $resultsArr;
}

function browseRequests($data){
    $categoryId = sanitize_text_field($data['categoryId']);
    global $wpdb;
    $servicesTable = $wpdb->prefix . "pwf_services";
    $serviceCategoriesTable = $wpdb->prefix . "pwf_service_categories";
    $usersTable = $wpdb->prefix . "users";
    $query = 'SELECT services.id, services.servicename, services.servicedescription, services.priceballpark, services.timeframe, services.postedby, "title" as "found_in", users.display_name as "provider_name" 
    FROM %i services 
    JOIN %i service_categories on services.id = service_categories.serviceid
    JOIN %i users ON users.id = services.postedby
    WHERE service_categories.categoryid = %d
    AND isrequest = 1';
    $results = $wpdb->get_results($wpdb->prepare($query, $servicesTable, $serviceCategoriesTable, $usersTable, $categoryId), ARRAY_A);
    return $results;
}