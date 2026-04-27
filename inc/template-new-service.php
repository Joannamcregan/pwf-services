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
                <label>Service name:</label>
                <input type="text"></input>
                <label>Service description:</label>
                <textarea></textarea>
                <label>Ballpark price:</label>
                <input type="text"></input>
                <label>Estimated time to complete:</label>
                <input type="text"></input>
                <label>Service type:</label>
                <?php $query = 'SELECT id, typename FROM %i';
                $results = $wpdb->get_results($wpdb->prepare($query, $serviceTypesTable), ARRAY_A);
                if ($results){
                    ?><select>
                    <?php for ($i = 0; $i < count($results); $i++){
                        ?><option data-typeid="<?php echo $results[$i]['id'] ?>"><?php echo $results[$i]['typename'] ?></option>
                    <?php }
                    ?></select>
                <?php }
                ?><br><br><label>Provider:</label>
                <?php $query = 'SELECT id, display_name FROM %i';
                $results = $wpdb->get_results($wpdb->prepare($query, $usersTable), ARRAY_A);
                if ($results){
                    ?><select>
                    <?php for ($i = 0; $i < count($results); $i++){
                        ?><option data-userid="<?php echo $results[$i]['id'] ?>"><?php echo $results[$i]['display_name'] ?></option>
                    <?php }
                    ?></select>
                <?php }
                ?><button id="pwf-new-service-submit">submit</button>
            </div>
        <?php } else {
            ?><p class="centered-text">Only member-owners can add service listings. <a href="<?php echo esc_url(site_url('/join')) ?>">Join our cooperative!</a></p>
        <?php }
    } else {
        ?><p class="centered-text">Only logged-in member-owners can add service listings.</p>
    <?php }
?></main>
<?php get_footer();