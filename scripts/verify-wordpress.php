<?php
require '/wordpress/wp-load.php';
function check_lux($ok,$label){if(!$ok)throw new Exception('FAILED: '.$label);echo 'PASS: '.$label."\n";}
wp_set_current_user(1);
$report=lux_import_starter(true);
check_lux(count(lux_posts('lux_guide'))===6,'six imported guides');
check_lux(count(lux_posts('lux_experience'))===15,'twelve experience templates and three existing outing articles');
check_lux(count(get_terms(['taxonomy'=>'lux_exp_group','hide_empty'=>false]))===4,'four experience collections');
foreach(array_merge(lux_posts('lux_guide'),lux_posts('lux_experience')) as $p)check_lux(has_post_thumbnail($p),'media cover: '.$p->post_name);
$guide=lux_posts('lux_guide')[0];$cover=get_post_thumbnail_id(lux_posts('lux_experience')[0]);
$body='<!-- wp:heading --><h2 class="wp-block-heading">An editable heading</h2><!-- /wp:heading --><!-- wp:paragraph --><p>Edited inside WordPress.</p><!-- /wp:paragraph --><!-- wp:image {"id":'.$cover.'} --><figure class="wp-block-image"><img src="'.esc_url(wp_get_attachment_url($cover)).'" alt="Test photo" class="wp-image-'.$cover.'"/></figure><!-- /wp:image -->';
$original=['ID'=>$guide->ID,'post_title'=>$guide->post_title,'post_excerpt'=>$guide->post_excerpt,'post_content'=>$guide->post_content];$old_cover=get_post_thumbnail_id($guide);
wp_update_post(['ID'=>$guide->ID,'post_title'=>'Edited card title','post_excerpt'=>'Edited card summary','post_content'=>$body]);set_post_thumbnail($guide->ID,$cover);$updated=lux_card_data(get_post($guide->ID));check_lux($updated['title']==='Edited card title'&&$updated['summary']==='Edited card summary','card title and excerpt are editable');check_lux($updated['image']===wp_get_attachment_image_url($cover,'large'),'cover updates');check_lux(str_contains(apply_filters('the_content',get_post_field('post_content',$guide->ID)),'An editable heading'),'Gutenberg headings and image content render');
lux_import_starter(false);check_lux(get_the_title($guide->ID)==='Edited card title','reimport preserves existing edits');check_lux(count(lux_posts('lux_guide'))===6,'reimport is idempotent');wp_update_post($original);set_post_thumbnail($guide->ID,$old_cover);
foreach(['lux_guide','lux_experience'] as $type){$draft=wp_insert_post(['post_type'=>$type,'post_title'=>'Draft verification','post_status'=>'draft']);$id=wp_insert_post(['post_type'=>$type,'post_title'=>'New verification article','post_name'=>'new-verification-'.$type,'post_status'=>'publish','menu_order'=>999,'post_content'=>$body]);$posts=lux_posts($type);check_lux(in_array($id,wp_list_pluck($posts,'ID'),true),'new '.$type.' appears automatically');check_lux(!in_array($draft,wp_list_pluck($posts,'ID'),true),'draft '.$type.' stays private');$tax=$type==='lux_guide'?'lux_guide_group':'lux_exp_group';check_lux(count(wp_get_object_terms($id,$tax))>0,'default section is assigned');wp_trash_post($id);check_lux(!in_array($id,wp_list_pluck(lux_posts($type),'ID'),true),'trashed '.$type.' removed');wp_delete_post($id,true);wp_delete_post($draft,true);}
wp_trash_post($guide->ID);lux_import_starter(false);check_lux(count(lux_posts('lux_guide'))===5,'reimport does not recreate trashed starter article');wp_untrash_post($guide->ID);wp_update_post(['ID'=>$guide->ID,'post_status'=>'publish']);
$data=lux_wp_data();check_lux(count($data['guides'])===6&&count($data['experiences'])===15,'bootstrap includes current published content only');check_lux(!str_contains(wp_json_encode($data),'Edited card title'),'test edits restored');
$home=get_page_by_path('home');check_lux((int)get_option('page_on_front')===$home->ID,'front page configured only by explicit import option');
foreach(['home','about','owners','contact','experiences','guides','header','footer'] as $view)check_lux(strlen(lux_snapshot($view))>500,'server fallback: '.$view);
check_lux(str_contains(lux_snapshot('home'),get_template_directory_uri().'/assets/images/'),'server image URLs use theme location');
file_put_contents('/tests/verification-result.json',wp_json_encode(['wordpress'=>get_bloginfo('version'),'php'=>PHP_VERSION,'guide_count'=>6,'experience_count'=>15,'checks'=>'passed','checked_at'=>gmdate('c')],JSON_PRETTY_PRINT));
file_put_contents('/tests/test-bootstrap.json',wp_json_encode(lux_wp_data()));
echo "ALL WORDPRESS INTEGRATION CHECKS PASSED\n";
