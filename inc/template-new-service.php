<?php get_header();
global $wpdb;
$servicesTable = $wpdb->prefix . "pwf_services";
$categoriesTable = $wpdb->prefix . "pwf_categories";
$serviceCategoriesTable = $wpdb->prefix . "pwf_service_categories";
$serviceTypesTable = $wpdb->prefix . "pwf_service_types";
$usersTable = $wpdb->prefix . "users";
$user = wp_get_current_user();
?><main class="pwf-services">
    <h1>Add a New Service Listing</h1>
    <?php if (is_user_logged_in()){
        if (in_array( 'administrator', (array) $user->roles ) ){
            ?><div class="pwf-services-form">
                <label for="pwf-new-service-name">Service name:</label>
                <input type="text" id="pwf-new-service-name"></input>
                <label for="pwf-new-service-description">Service description:</label>
                <textarea id="pwf-new-service-description"></textarea>
                <label for="pwf-new-service-price">Ballpark price:</label>
                <input type="text" id="pwf-new-service-price"></input>
                <label for="pwf-new-service-timeframe">Estimated time to complete:</label>
                <input type="text" id="pwf-new-service-timeframe"></input>
                <label for="pwf-new-service-type">Service type:</label>
                <?php $query = 'SELECT id, typename FROM %i';
                $results = $wpdb->get_results($wpdb->prepare($query, $serviceTypesTable), ARRAY_A);
                if ($results){
                    ?><select id="pwf-new-service-type">
                    <?php for ($i = 0; $i < count($results); $i++){
                        ?><option data-typeid="<?php echo $results[$i]['id'] ?>"><?php echo $results[$i]['typename'] ?></option>
                    <?php }
                    ?></select>
                <?php }
                ?><br><br><label for="pwf-new-service-provider">Provider:</label>
                <?php $query = 'SELECT id, display_name FROM %i';
                $results = $wpdb->get_results($wpdb->prepare($query, $usersTable), ARRAY_A);
                if ($results){
                    ?><select id="pwf-new-service-provider">
                    <?php for ($i = 0; $i < count($results); $i++){
                        ?><option data-userid="<?php echo $results[$i]['id'] ?>"><?php echo $results[$i]['display_name'] ?></option>
                    <?php }
                    ?></select>
                <?php }
                ?><p class="pwf-new-service-error hidden" id="pwf-new-service-error--name">Service name cannot be blank.</p>
                <p class="pwf-new-service-error hidden" id="pwf-new-service-error--description">Service description cannot be blank.</p>
                <p class="pwf-new-service-error hidden" id="pwf-new-service-error--price">Ballpark price cannot be blank.</p>
                <p class="pwf-new-service-error hidden" id="pwf-new-service-error--timeframe">Estimated timeframe cannot be blank.</p>
                <button id="pwf-new-service-submit">submit</button>
            </div>
        <?php } else {
            ?><p class="centered-text">Only member-owners can add service listings. <a href="<?php echo esc_url(site_url('/join')) ?>">Join our cooperative!</a></p>
        <?php }
    } else {
        ?><p class="centered-text">Only logged-in member-owners can add service listings.</p>
    <?php }
?></main>
<?php get_footer();