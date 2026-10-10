<?php

/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 * @package wpblocks
 */

$args = [
	'numberposts' => $attributes['numberOfPosts'] ?? 2,
	'post_status' => 'publish',
	'orderby' => $attributes['orderBy'] ?? 'date',
	'order' => $attributes['order'] ?? 'asc',
];

if (isset($attributes['categories']) && !empty($attributes['categories'])) {
	$args['category__in'] = array_column($attributes['categories'], 'id');
}

$recent_posts = wp_get_recent_posts($args);
?>
<ul <?php echo get_block_wrapper_attributes(); ?>>
	<?php foreach ($recent_posts as $post) :
		$permalink = get_permalink($post['ID']);
		$post_title = get_the_title($post['ID']) ? get_the_title($post['ID']) : __('(No title)', 'wpblocks');
		$post_excerpt = get_the_excerpt($post['ID']);
	?>
		<li>
			<a href="<?php echo esc_url($permalink); ?>">
				<h5><?php echo esc_html($post_title); ?></h5>
			</a>
			<?php if ($attributes['showFeaturedImage'] && has_post_thumbnail($post['ID'])) : ?>
				<div class="post-thumbnail">
					<?php echo get_the_post_thumbnail($post['ID'], 'thumbnail'); ?>
				</div>
			<?php endif; ?>
			<time datetime="<?php echo esc_attr(get_the_date(DATE_W3C, $post['ID'])); ?>"><?php echo esc_html(get_the_date('', $post['ID'])); ?></time>
			<?php if ($post_excerpt) : ?>
				<p><?php echo esc_html($post_excerpt); ?></p>
			<?php endif; ?>
		</li>
	<?php endforeach; ?>
</ul>