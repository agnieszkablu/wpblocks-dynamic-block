import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';
import { useSelect } from '@wordpress/data';
import { RawHTML } from '@wordpress/element';
import { format, dateI18n, getSettings } from '@wordpress/date';

export default function Edit({ attributes }) {
	const { numberOfPosts, showFeaturedImage } = attributes;
	const posts = useSelect((select) => {
		return select('core').getEntityRecords('postType', 'post', {
			per_page: numberOfPosts,
			_embed: true,
		 });
	}, [numberOfPosts]);

	return (
		<ul { ...useBlockProps() }>
			{posts && posts.map((post) => {
				const featuredImage = showFeaturedImage && post.featured_media ? post._embedded['wp:featuredmedia'][0] : null;

				return (
					<li key={post.id}>
						{post.title.rendered && (
							<h5>
								<a href={post.link}>
									<RawHTML>
										{post.title.rendered || __('(No title)', 'wpblocks')}
									</RawHTML>
								</a>
							</h5>
						)}
						{featuredImage && (
							<div className="post-thumbnail">
								<img src={featuredImage.media_details?.sizes?.large?.source_url || featuredImage.source_url} alt={featuredImage.alt_text || post.title.rendered} />
							</div>
						)}
						{post.date_gmt && (
							<time dateTime={format('c', post.date_gmt)}>{dateI18n(getSettings().formats.date, post.date_gmt)}</time>
						)}
						{post.excerpt.rendered && (
							<RawHTML>
								{post.excerpt.rendered}
							</RawHTML>
						)}
					</li>
				)
			})}
		</ul>
	);
}
