<?php get_header();
$suggestions = ['portrait', 'book cover design', 'flyer design', 'jingle writing', 'editing', 'illustration'];
?><main class="pwf-services">
    <h1>Search Services</h1>
    <input type="text" id="pwf-services-search-field" placeholder="<?php echo $suggestions[mt_rand(0, count($suggestions) - 1)]; ?>"></input>
    <?php if (is_user_logged_in()){
        ?><p id="pwf-services-search-submit" class="pwf-services-search-button pwf-search-button">submit</p>
    <?php } else {
        ?><p id="pwf-services-search-submit--preview" class="pwf-services-search-button pwf-search-button">submit</p>
    <?php }
    ?><p id="pwf-search-term-error" class="hidden">The search term cannot have less than 3 letters.</p>
    <div id="pwf-services-search-results" class="pwf-search-results">
        <p class="initial-message">Need something done? Use the power of community to find a trusted freelancer who can do it!</p>
        <p class="initial-message">Want to offer your services? Join our cooperative!</p>
        <p  class="initial-message">NOTE: this site is currently for DEMONSTRATION PURPOSES ONLY.</p>
    </div>
    <div id="load-more"></div>
</main>
<?php get_footer();