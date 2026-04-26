<?php get_header();
global $wpdb;
$servicesTable = $wpdb->prefix . "pwf_services";
$categoriesTable = $wpdb->prefix . "pwf_categories";
$serviceCategoriesTable = $wpdb->prefix . "pwf_service_categories";
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
            </div>
        <?php } else {
            ?><p class="centered-text">Only member-owners can add service listings. <a href="<?php echo esc_url(site_url('/join')) ?>">Join our cooperative!</a></p>
        <?php }
    } else {
        ?><p class="centered-text">Only logged-in member-owners can add service listings.</p>
    <?php }
?></main>
<?php get_footer();