<?php get_header();
?><main class="pwf-services">
    <h1>Search Services</h1>
    <input type="text" id="pwf-services-search-field"></input>
    <?php if (is_user_logged_in()){
        ?><p id="pwf-services-search-submit" class="pwf-services-search-boat">submit</p>
    <?php } else {
        ?><p id="pwf-services-search-submit--preview" class="pwf-services-search-boat">submit</p>
    <?php }
    ?><p id="pwf-search-term-error" class="hidden">The search term cannot have less than 3 letters.</p>
    <div id="pwf-services-search-results">
        <p>Need something done? Use the power of community to find a trusted freelancer who can do it!</p>
        <p>Want to offer your services? Join our cooperative!</p>
        <p>NOTE: this site is currently for DEMONSTRATION PURPOSES ONLY.</p>
    </div>
</main>
<?php get_footer();