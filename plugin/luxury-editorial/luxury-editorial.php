<?php
/**
 * Plugin Name: Luxury Editorial
 * Description: Guides, Experiences, collections and starter content for Luxury Apart Hotel. Content remains available when themes change.
 * Version: 1.0.0
 * Requires at least: 6.6
 * Requires PHP: 8.0
 * License: GPL-2.0-or-later
 * Text Domain: luxury-editorial
 */
if (!defined('ABSPATH')) exit;
function lux_register_content() {
 foreach (['lux_guide'=>['Guides','Guide','guides-insights','dashicons-book-alt'], 'lux_experience'=>['Experiences','Experience','experiences','dashicons-location-alt']] as $type=>$v) {
  register_post_type($type, ['labels'=>['name'=>$v[0], 'singular_name'=>$v[1], 'add_new_item'=>'Add new '.$v[1], 'edit_item'=>'Edit '.$v[1], 'all_items'=>'All '.$v[0]], 'public'=>true, 'show_in_rest'=>true, 'menu_icon'=>$v[3], 'has_archive'=>false, 'rewrite'=>['slug'=>$v[2], 'with_front'=>false], 'supports'=>['title','editor','excerpt','thumbnail','revisions','page-attributes'], 'taxonomies'=>[$type==='lux_guide'?'lux_guide_group':'lux_exp_group']]);
 }
 register_taxonomy('lux_guide_group',['lux_guide'],['label'=>'Guide sections','public'=>true,'show_in_rest'=>true,'hierarchical'=>true,'rewrite'=>false,'show_admin_column'=>true]);
 register_taxonomy('lux_exp_group',['lux_experience'],['label'=>'Experience collections','public'=>true,'show_in_rest'=>true,'hierarchical'=>true,'rewrite'=>false,'show_admin_column'=>true]);
}
add_action('init','lux_register_content');
function lux_default_terms(){
 $terms=['lux_exp_group'=>['holidays-abroad'=>'Holidays Abroad','georgia-tours'=>'Georgia Tours','custom-trip'=>'Custom Trip','concierge-service'=>'Concierge Service'], 'lux_guide_group'=>['local-knowledge'=>'Local knowledge','behind-the-stay'=>'Behind the stay']];
 foreach($terms as $taxonomy=>$items)foreach($items as $slug=>$name)if(!term_exists($slug,$taxonomy))wp_insert_term($name,$taxonomy,['slug'=>$slug]);
}
register_activation_hook(__FILE__,function(){lux_register_content();lux_default_terms();flush_rewrite_rules();});
register_deactivation_hook(__FILE__,function(){flush_rewrite_rules();});
add_action('after_setup_theme',function(){add_theme_support('post-thumbnails');});
add_action('wp_after_insert_post',function($id,$post){
 if(!in_array($post->post_type,['lux_guide','lux_experience'],true)||wp_is_post_revision($id))return;
 $tax=$post->post_type==='lux_guide'?'lux_guide_group':'lux_exp_group';
 if(!wp_get_object_terms($id,$tax,['fields'=>'ids'])){lux_default_terms();$term=get_term_by('slug',$post->post_type==='lux_guide'?'local-knowledge':'georgia-tours',$tax);if($term)wp_set_object_terms($id,[(int)$term->term_id],$tax);}
},10,2);
add_action('add_meta_boxes',function(){foreach(['lux_guide','lux_experience'] as $type)add_meta_box('lux-card-options','Card settings','lux_card_box',$type,'side','default');});
function lux_card_box($post){wp_nonce_field('lux_card_settings','lux_card_nonce');echo '<p>The title and featured image appear on the card. Use <strong>Excerpt</strong> for the short description. Choose a section in the sidebar.</p><p><label for="lux-card-order">Card order (lower comes first)</label><input id="lux-card-order" name="lux_card_order" type="number" min="0" value="'.esc_attr($post->menu_order).'" class="widefat"></p>';if($post->post_type==='lux_guide')echo '<p><label><input type="checkbox" name="lux_featured" value="1" '.checked(get_post_meta($post->ID,'_lux_featured',true),'1',false).'> Featured guide on the Guides landing page</label></p>';}
add_action('save_post',function($id){
 if(!isset($_POST['lux_card_nonce'])||!wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['lux_card_nonce'])),'lux_card_settings')||!current_user_can('edit_post',$id)||wp_is_post_autosave($id)||wp_is_post_revision($id))return;
 if(!in_array(get_post_type($id),['lux_guide','lux_experience'],true))return;
 if(isset($_POST['lux_card_order'])){global $wpdb;$wpdb->update($wpdb->posts,['menu_order'=>absint($_POST['lux_card_order'])],['ID'=>$id],['%d'],['%d']);clean_post_cache($id);}
 if(get_post_type($id)==='lux_guide')update_post_meta($id,'_lux_featured',isset($_POST['lux_featured'])?'1':'0');
});
add_filter('manage_lux_guide_posts_columns','lux_admin_columns');add_filter('manage_lux_experience_posts_columns','lux_admin_columns');
function lux_admin_columns($cols){$cols['lux_cover']='Cover';$cols['lux_order']='Order';return $cols;}
function lux_admin_column_value($col,$id){if($col==='lux_cover')echo get_the_post_thumbnail($id,[64,48]);if($col==='lux_order')echo (int)get_post_field('menu_order',$id);}
add_action('manage_lux_guide_posts_custom_column','lux_admin_column_value',10,2);add_action('manage_lux_experience_posts_custom_column','lux_admin_column_value',10,2);
add_action('admin_menu',function(){add_menu_page('Luxury setup','Luxury Setup','manage_options','luxury-setup','lux_setup_page','dashicons-admin-home',59);});
function lux_setup_page(){if(!current_user_can('manage_options'))return;?><div class="wrap"><h1>Luxury Apart Hotel · Content setup</h1><p>Manage cards in <strong>Guides</strong> and <strong>Experiences</strong>. Edit the title, featured image, excerpt, section and card order. Build articles with headings, paragraphs, photos, galleries and lists in the block editor.</p><p>The theme preserves the design and animation. This plugin stores your content independently of the theme.</p><?php if(isset($_GET['imported']))echo '<div class="notice notice-success"><p>Starter import completed. Existing pages and articles were not overwritten. See the report below.</p></div>'; $report=get_option('lux_import_report',[]);if($report)echo '<pre style="white-space:pre-wrap">'.esc_html(implode("\n",$report)).'</pre>';?><h2>Import starter content</h2><p>Creates only missing pages and demo articles. Imports bundled covers into the Media Library when the Luxury theme is installed. Existing content is kept. Can be run again to finish importing missing covers.</p><form action="<?php echo esc_url(admin_url('admin-post.php'));?>" method="post"><?php wp_nonce_field('lux_import');?><input type="hidden" name="action" value="lux_import"><p><label><input type="checkbox" name="set_front" value="1"> Set the imported Home page as the front page</label></p><?php submit_button('Import missing starter content');?></form><p><a href="<?php echo esc_url(admin_url('edit.php?post_type=lux_guide'));?>">Manage Guides</a> · <a href="<?php echo esc_url(admin_url('edit.php?post_type=lux_experience'));?>">Manage Experiences</a></p></div><?php }
function lux_import_image($name,$alt){
 $existing=get_posts(['post_type'=>'attachment','post_status'=>'inherit','meta_key'=>'_lux_seed_asset','meta_value'=>$name,'numberposts'=>1]);if($existing)return $existing[0]->ID;
 $themes=wp_get_themes();$theme_dir=isset($themes['luxury-apart-hotel'])?$themes['luxury-apart-hotel']->get_stylesheet_directory():'';
 $file=$theme_dir.'/assets/images/'.sanitize_file_name($name).'.webp';if(!$theme_dir||!is_readable($file))return 0;
 require_once ABSPATH.'wp-admin/includes/file.php';require_once ABSPATH.'wp-admin/includes/media.php';require_once ABSPATH.'wp-admin/includes/image.php';
 $tmp=wp_tempnam($name);if(!$tmp||!copy($file,$tmp))return 0;
 $id=media_handle_sideload(['name'=>sanitize_file_name($name).'.webp','tmp_name'=>$tmp],0,$alt);if(is_wp_error($id)){if(file_exists($tmp))unlink($tmp);return 0;}update_post_meta($id,'_lux_seed_asset',$name);update_post_meta($id,'_wp_attachment_image_alt',$alt);return $id;
}
function lux_import_starter($set_front=false){
 lux_default_terms();$seed=json_decode(file_get_contents(__DIR__.'/starter-content.json'),true);$report=[];
 foreach(['home'=>'Home','about-us'=>'About us','for-owners'=>'For owners','contact-us'=>'Contact us','experiences'=>'Experiences','guides-insights'=>'Guides & Insights'] as $slug=>$title){$found=get_page_by_path($slug,OBJECT,'page');if($found){$report[]='Kept existing page: '.$title;continue;}$id=wp_insert_post(['post_type'=>'page','post_title'=>$title,'post_name'=>$slug,'post_status'=>'publish'],true);if(is_wp_error($id)){$report[]=$id->get_error_message();continue;}update_post_meta($id,'_lux_view',['home'=>'home','about-us'=>'about','for-owners'=>'owners','contact-us'=>'contact','experiences'=>'experiences','guides-insights'=>'guides'][$slug]);$report[]='Created page: '.$title;}
 foreach($seed as $entry){$posts=get_posts(['post_type'=>$entry['type'],'name'=>$entry['slug'],'post_status'=>['publish','draft','pending','private','future','trash'],'numberposts'=>1]);if(!$posts)$posts=get_posts(['post_type'=>$entry['type'],'meta_key'=>'_lux_seed_key','meta_value'=>$entry['slug'],'post_status'=>['publish','draft','pending','private','future','trash'],'numberposts'=>1]);if($posts){$id=$posts[0]->ID;$report[]='Kept article: '.$entry['title'];}else{$id=wp_insert_post(['post_type'=>$entry['type'],'post_title'=>$entry['title'],'post_name'=>$entry['slug'],'post_excerpt'=>$entry['description'],'post_content'=>$entry['content'],'post_status'=>'publish','menu_order'=>$entry['order']],true);if(is_wp_error($id)){$report[]=$id->get_error_message();continue;}$term=get_term_by('slug',$entry['group'],$entry['type']==='lux_guide'?'lux_guide_group':'lux_exp_group');if($term)wp_set_object_terms($id,[(int)$term->term_id],$term->taxonomy);update_post_meta($id,'_lux_seed_article','1');update_post_meta($id,'_lux_seed_key',$entry['slug']);update_post_meta($id,'_lux_layout',$entry['layout']??'service');if(!empty($entry['featured']))update_post_meta($id,'_lux_featured','1');$report[]='Created article: '.$entry['title'];}
  if(get_post_meta($id,'_lux_seed_article',true)==='1'&&!has_post_thumbnail($id)&&!empty($entry['image'])){$image=lux_import_image($entry['image'],$entry['alt']);if($image)set_post_thumbnail($id,$image);else $report[]='Cover pending (install theme and rerun): '.$entry['title'];}
 }
 if($set_front){$home=get_page_by_path('home');if($home){update_option('show_on_front','page');update_option('page_on_front',$home->ID);}}
 update_option('lux_import_report',$report,false);flush_rewrite_rules();return $report;
}
add_action('admin_post_lux_import',function(){if(!current_user_can('manage_options'))wp_die('Not allowed',403);check_admin_referer('lux_import');lux_import_starter(!empty($_POST['set_front']));wp_safe_redirect(admin_url('admin.php?page=luxury-setup&imported=1'));exit;});
