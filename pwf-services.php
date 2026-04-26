<?php
/* 
    Plugin Name: PWF Services
    Version: 1.0
    Author: Joanna
    Description: Allow freelancers to offer services
*/
if( ! defined('ABSPATH') ) exit;

require_once plugin_dir_path(__FILE__) . 'inc/pwf-search-route.php';

class PWFServicesPlugin {
    function __construct() {
        global $wpdb;
        $this->charset = $wpdb->get_charset_collate();
        $this->users_table = $wpdb->prefix . "users";
        $this->services_table = $wpdb->prefix .  "pwf_services"; //add an isRequest column?
        $this->service_types_table = $wpdb->prefix . "pwf_service_types";
        $this->categories_table = $wpdb->prefix . "pwf_categories";
        $this->service_categories_table = $wpdb->prefix . "pwf_service_categories"; //to be used for both services and requests
        // wp_localize_script('pwf-services-js', 'pwfData', array(
        //     'root_url' => get_site_url()
        // ));
        add_action('activate_pwf-services/pwf-services.php', array($this, 'onActivate'));
        add_action('init', array($this, 'registerScripts'));
        add_action('wp_enqueue_scripts', array($this, 'pluginFiles'));
        add_filter('template_include', array($this, 'loadTemplate'), 99);
    }

    function addPage($pageName){
        $new_page = array(
            'post_title' => $pageName,
            'post_content' => '',
            'post_status' => 'publish',
            'post_author' => 0,
            'post_type' => 'page'
        );
        wp_insert_post($new_page);
    }

    function registerScripts(){
        wp_register_style('pwf-services-styles', plugins_url('css/services.css', __FILE__), false, '1.0', 'all');
    }

    function pluginFiles(){
        wp_enqueue_style('pwf-services-styles');
        wp_enqueue_script('pwf-services-js', plugin_dir_url(__FILE__) . '/build/index.js', array('jquery'), '1.0', true);
        wp_localize_script('pwf-services-js', 'pwfData', array(
            'root_url' => get_site_url()
        ));
    }

    function loadTemplate($template){
        if (is_page('Services')){
            return plugin_dir_path(__FILE__) . 'inc/template-services.php';
        } else if (is_page('Requests')){
            return plugin_dir_path(__FILE__) . 'inc/template-requests.php';
        } else if (is_page('New Service')){
            return plugin_dir_path(__FILE__) . 'inc/template-new-service.php';
        } else {
            return $template;
        }
    }

    function onActivate(){
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

        dbDelta("CREATE TABLE IF NOT EXISTS $this->service_types_table (
            id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            typename varchar(200) NOT NULL,
            description varchar(2000),
            createdby bigint(20) unsigned NOT NULL,
            createdate datetime NOT NULL,
            PRIMARY KEY  (id),
            FOREIGN KEY  (createdby) REFERENCES $this->users_table(id)
        ) $this->charset;");
        dbDelta("CREATE TABLE IF NOT EXISTS $this->services_table (
            id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            servicename varchar(200) NOT NULL,
            servicedescription varchar(10000) NOT NULL,
            priceballpark varchar(1000),
            timeframe varchar(1000),
            isrequest bit NOT NULL default 0,
            typeid bigint(20) unsigned NOT NULL,
            postedby bigint(20) unsigned NOT NULL,
            createdate datetime NOT NULL,
            PRIMARY KEY  (id),
            FOREIGN KEY  (postedby) REFERENCES $this->users_table(id),
            FOREIGN KEY  (typeid) REFERENCES $this->service_types_table(id)
        ) $this->charset;");
        dbDelta("CREATE TABLE IF NOT EXISTS $this->categories_table (
            id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            category_name varchar(200) NOT NULL,
            parent_category bigint(20) unsigned,
            category_description varchar(500),
            createdate datetime NOT NULL,
            createdby bigint(20) unsigned NOT NULL,
            PRIMARY KEY  (id),
            FOREIGN KEY  (createdby) REFERENCES $this->users_table(id)
        ) $this->charset;");
        dbDelta("CREATE TABLE IF NOT EXISTS $this->service_categories_table (
            id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            serviceid bigint(20) unsigned NOT NULL,
            categoryid bigint(20) unsigned NOT NULL,
            createdate datetime NOT NULL,
            PRIMARY KEY  (id),
            FOREIGN KEY  (serviceid) REFERENCES $this->services_table(id),
            FOREIGN KEY  (categoryid) REFERENCES $this->categories_table(id)
        ) $this->charset;");

        if (post_exists('Services', '', '', 'page', 'publish') == 0){
            $this->addPage('Services');
        }

        if (post_exists('Requests', '', '', 'page', 'publish') == 0){
            $this->addPage('Requests');
        }

        if (post_exists('New Service', '', '', 'page', 'publish') == 0){
            $this->addPage('New Service');
        }
    }
}
$pwfServices = new PWFServicesPlugin();