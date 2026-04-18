<?php get_header();
?><main class="pwf-services">
    <h1>Search Requests</h1>
    <input type="text" id="pwf-requests-search-field"></input>
    <?php if (is_user_logged_in()){
        ?><p id="pwf-requests-search-submit" class="pwf-requests-search-button pwf-search-button">submit</p>
    <?php } else {
        ?><p id="pwf-requests-search-submit--preview" class="pwf-requests-search-button pwf-search-button">submit</p>
    <?php }
    ?><p id="pwf-search-term-error" class="hidden">The search term cannot have less than 3 letters.</p>
    <div id="pwf-requests-search-results" class="pwf-search-results">
        <p class="initial-message">Looking for work? Use the power of community to find trusted clients!</p>
        <p class="initial-message">Want to post jobs? Join our cooperative!</p>
        <p  class="initial-message">NOTE: this site is currently for DEMONSTRATION PURPOSES ONLY.</p>
    </div>
    <div id="load-more"></div>
</main>
<?php get_footer();