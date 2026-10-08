import { useBlockProps } from '@wordpress/block-editor';

export default function save() {
	return (
		<p {...useBlockProps.save()}>
			{'dynamic-block - hello from the saved content!'}
		</p>
	);
}
