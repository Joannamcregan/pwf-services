<?php get_header();
?><main>
    <div class="max-width-700 centered-x margin-y-60">
        <h1>A Cooperatively Owned Meeting Place for Freelancers and Clients</h1>
        <p>One day this page will explain what our cooperatively owned networking platform for freelancers and clients <em>is</em>. For now, this demo site shows an example of <em>what it could be</em>. The hope is that cooperators will contribute ideas, designs, and perspectives that will reshape the idea and grow it into something truly useful. But why is a cooperatively owned networking platform for freelancers and clients so necessary in the first place?</p>
        <?php get_template_part( 'template-parts/about'); ?>
        <h2 class="subheading">Get Involved</h2>
        <p>Bringing this platform to life won't be easy, but it will be worth it. Want to help? Fill out the interest form below!</p>
        <?php echo do_shortcode('[forminator_form id="45"]'); ?>
        <!-- 52 dev, 45 prod -->
    </div>
</main>
<?php get_footer(); ?>