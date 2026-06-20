<?php get_header(); 
global $wp_query;
global $wpdb;
$servicesTable = $wpdb->prefix . "pwf_services";
$usersTable = $wpdb->prefix . "users";
$service = $wp_query->query_vars['service'];
$query = 'SELECT services.servicename, services.servicedescription, services.priceballpark, services.timeframe, users.display_name as "provider_name" FROM %i services 
    JOIN %i users ON users.id = services.postedby
    WHERE services.id = %d';
$result = $wpdb->get_results($wpdb->prepare($query, $servicesTable, $usersTable, $service), ARRAY_A);
?><main>
<?php if ($result){
    echo var_dump($result);
} else {
    ?><div class="max-width-500  margin-y-60 centered-x">
        <h1 class="centered-text margin-bottom-10">Service Not Found</h1>
        <p>Sorry, we can't find the service you're looking for. <a href="<?php echo esc_url(site_url()) ?>" class="no-wrap">Head home?</a></p>
    </div>
<?php }
?></main>
<?php get_footer();