<?php get_header();
global $wpdb;
$preview = !is_user_logged_in();
$categoriesTable = $wpdb->prefix . "pwf_categories";
$query = 'SELECT id, category_name
FROM %i';
$results = $wpdb->get_results($wpdb->prepare($query, $categoriesTable), ARRAY_A);
?><main class="pwf-services">
    <h1>Browse Job Requests</h1>
    <?php if (count($results) > 0){
        ?><div class="pwf-category-container">
        <?php for ($i = 0; $i < count($results); $i++){
            ?><span class="pwf-category-span" data-id="<?php echo $results[$i]['id']; ?>" data-preview="<?php echo $preview; ?>"><?php echo $results[$i]['category_name']; ?></span>
        <?php }
        }
        ?></div>
    <p id="pwf-search-term-error" class="hidden">The search term cannot have less than 3 letters.</p>
    <div id="pwf-requests-search-results" class="pwf-search-results">
        <p class="initial-message">Looking for work? Use the power of community to find trusted clients!</p>
        <p class="initial-message">Want to post jobs? Join our cooperative!</p>
        <p  class="initial-message">NOTE: this site is currently for DEMONSTRATION PURPOSES ONLY.</p>
    </div>
    <div id="load-more"></div>
</main>
<?php get_footer();