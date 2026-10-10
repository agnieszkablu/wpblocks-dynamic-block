import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import './editor.scss';
import { useSelect } from '@wordpress/data';
import { RawHTML, useMemo } from '@wordpress/element';
import { format, dateI18n, getSettings } from '@wordpress/date';
import { PanelBody, ToggleControl, QueryControls } from '@wordpress/components';


export default function Edit({ attributes, setAttributes }) {
	const { numberOfPosts, showFeaturedImage, orderBy, order, categories } = attributes;
	const catIds = useMemo(() => categories && categories.length > 0 ? categories.map(cat => cat.id) : [], [categories]);
	const posts = useSelect((select) => {
		return select('core').getEntityRecords('postType', 'post', {
			per_page: numberOfPosts,
			_embed: true,
			orderby: orderBy,
			order,
			categories: catIds,
		 });
	}, [numberOfPosts, orderBy, order, catIds]);

	const allCats = useSelect((select) => {
		return select('core').getEntityRecords('taxonomy', 'category', {
			per_page: -1,
		 });
	}, []);

	const catSuggestions = [];
	if (allCats) {
		allCats.forEach(cat => {
			catSuggestions[cat.name] = cat;
		});
	}

	const onDisplayedChange = (value) => setAttributes({ showFeaturedImage: value });
	const onNumberOfPostsChange = (value) => setAttributes({ numberOfPosts: value });
	const onCategoryChange = (values) => {
		const hasNoSuggestions = values.some((value) => typeof value === 'string' && !catSuggestions[value]);

		if (hasNoSuggestions) return;

		const updateCats = values.map((value) => {
			return typeof value === 'string' ? catSuggestions[value] : value;
		});

		setAttributes({ categories: updateCats });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings', 'wpblocks')}>
					{/* <RangeControl
						label={__('Number of Posts', 'wpblocks')}
						value={numberOfPosts}
						onChange={ onNumberOfPostsChange }
						min={1}
						max={10}
					/> */}
					<QueryControls
						numberOfItems={numberOfPosts}
						onNumberOfItemsChange={onNumberOfPostsChange}
						maxItems={10}
						minItems={2}
						orderBy={orderBy}
						onOrderByChange={(value) => setAttributes({ orderBy: value })}
						order={order}
						onOrderChange={(value) => setAttributes({ order: value })}
						categorySuggestions={catSuggestions}
						selectedCategories={categories}
						onCategoryChange={ onCategoryChange }
					/>
					<ToggleControl
						label={__('Show Featured Image', 'wpblocks')}
						checked={showFeaturedImage}
						onChange={ onDisplayedChange }
					/>
				</PanelBody>
			</InspectorControls>
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
		</>
	);
}
