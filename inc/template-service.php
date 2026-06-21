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
    <div class="max-width-700 centered-x margin-y-60">
    <?php if ($result){
        ?><h1><?php echo $result[0]['servicename']; ?></h1>
        <p><?php echo $result[0]['servicedescription']; ?></p>
        <p><strong>Ballpark pricing: </strong><em><?php echo $result[0]['priceballpark']; ?></em></p>
        <p><strong>Estimated time to complete: </strong><em><?php echo $result[0]['timeframe']; ?></em></p>
        <div class="single-service-provider-section">
            <?php if (is_user_logged_in()){
                ?><p><strong>Provider: </strong><em><?php echo $result[0]['provider_name']; ?></em></p>
            <?php } else {
                ?><p>Only logged in members can view information about service providers.</p>
                <p>Already a member? <a>Login.</a></p>
                <p>Not a member yet? <a>Join the cooperative!</a></p>
            <?php }
        ?></div>
    <?php } else {
        ?><h1 class="centered-text margin-bottom-10">Service Not Found</h1>
        <p>Sorry, we can't find the service you're looking for. <a href="<?php echo esc_url(site_url()) ?>" class="no-wrap">Head home?</a></p>
    <?php }
    ?></div>
</main>
<?php get_footer();