<?php get_header();
global $wpdb;
$servicesTable = $wpdb->prefix . "pwf_services";
$categoriesTable = $wpdb->prefix . "pwf_categories";
$serviceCategoriesTable = $wpdb->prefix . "pwf_service_categories";
$serviceTypesTable = $wpdb->prefix . "pwf_service_types";
$usersTable = $wpdb->prefix . "users";
$user = wp_get_current_user();
?><main class="pwf-services">
    <h1>Add a New Request</h1>
    <?php if (is_user_logged_in()){
        if (in_array( 'administrator', (array) $user->roles ) ){
            ?><div class="pwf-services-form">
                <label for="pwf-new-service-name">Request name:</label>
                <input type="text" id="pwf-new-service-name"></input>
                <label for="pwf-new-service-description">Request description:</label>
                <textarea id="pwf-new-service-description"></textarea>
                <label for="pwf-new-service-price">Budget:</label>
                <input type="text" id="pwf-new-service-price"></input>
                <label for="pwf-new-service-timeframe">Needs to be completed by:</label>
                <input type="text" id="pwf-new-service-timeframe"></input>
                <?php $query = 'SELECT id, typename FROM %i';
                $results = $wpdb->get_results($wpdb->prepare($query, $serviceTypesTable), ARRAY_A);
                if ($results){
                    ?><label for="pwf-new-service-type">Request type:</label>
                    <select id="pwf-new-service-type">
                    <?php for ($i = 0; $i < count($results); $i++){
                        ?><option data-id="<?php echo $results[$i]['id'] ?>"><?php echo $results[$i]['typename'] ?></option>
                    <?php }
                    ?></select>
                <?php }
                ?><br><br><label for="pwf-new-service-provider">Requester:</label>
                <?php $query = 'SELECT id, display_name FROM %i';
                $results = $wpdb->get_results($wpdb->prepare($query, $usersTable), ARRAY_A);
                if ($results){
                    ?><select id="pwf-new-service-provider">
                    <?php for ($i = 0; $i < count($results); $i++){
                        ?><option data-id="<?php echo $results[$i]['id'] ?>"><?php echo $results[$i]['display_name'] ?></option>
                    <?php }
                    ?></select>
                <?php }
                $query = 'SELECT id, category_name FROM %i order by category_name';
                $results = $wpdb->get_results($wpdb->prepare($query, $categoriesTable), ARRAY_A);
                if ($results){
                    ?><p class="pwf-service-categories-label">Request categories</p>
                    <div class="pwf-category-container">
                        <?php for ($i = 0; $i < count($results); $i++){
                            ?><span class="pwf-new-service-category-span" data-id="<?php echo $results[$i]['id']; ?>" data-preview="<?php echo $preview; ?>" aria-label="<?php echo $results[$i]['category_name'] . ' is not selected'; ?>" tabindex="0"><?php echo $results[$i]['category_name']; ?></span>
                        <?php }
                    ?></div>
                    <p class="pwf-new-service-error hidden" id="pwf-new-service-error--categories">No more than three categories can be selected.</p>
                <?php }
                ?><p class="pwf-new-service-error hidden" id="pwf-new-service-error--name">Request name cannot be blank.</p>
                <p class="pwf-new-service-error hidden" id="pwf-new-service-error--description">Request description cannot be blank.</p>
                <p class="pwf-new-service-error hidden" id="pwf-new-service-error--price">Budget cannot be blank.</p>
                <p class="pwf-new-service-error hidden" id="pwf-new-service-error--timeframe">Completion time cannot be blank.</p>
                <button id="pwf-new-request-submit">submit</button>
            </div>
        <?php } else {
            ?><p class="centered-text">Only member-owners can add requests. <a href="<?php echo esc_url(site_url('/join')) ?>">Join our cooperative!</a></p>
        <?php }
    } else {
        ?><p class="centered-text">Only logged-in member-owners can add requests.</p>
    <?php }
?></main>
<?php get_footer();