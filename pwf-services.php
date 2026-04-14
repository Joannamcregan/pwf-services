<?php
/* 
    Plugin Name: PWF Services
    Version: 1.0
    Author: Joanna
    Description: Allow freelancers to offer services
*/
if( ! defined('ABSPATH') ) exit;
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
        add_filter('template_include', array($this, 'loadTemplate'), 99);
    }

    function addServicesPage() {
        $services_page = array(
            'post_title' => 'Services',
            'post_content' => '',
            'post_status' => 'publish',
            'post_author' => 0,
            'post_type' => 'page'
        );
        wp_insert_post($services_page);
    }

    function loadTemplate($template){
        if (is_page('Services')){
            return plugin_dir_path(__FILE__) . 'inc/template-services.php';
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
            typeid bigint(20) unsigned NOT NULL,
            providerid bigint(20) unsigned NOT NULL,
            createdate datetime NOT NULL,
            PRIMARY KEY  (id),
            FOREIGN KEY  (providerid) REFERENCES $this->users_table(id),
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
            $this->addServicesPage();
        }
    }
}
$pwfServices = new PWFServicesPlugin();