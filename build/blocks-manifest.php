<?php
// This file is generated. Do not modify it manually.
return array(
	'dynamic-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'wpblocks/dynamic-block',
		'version' => '0.1.0',
		'title' => 'Dynamic block',
		'category' => 'widgets',
		'icon' => 'smiley',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'dynamic-block',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js',
		'attributes' => array(
			'numberOfPosts' => array(
				'type' => 'number',
				'default' => 2
			),
			'showFeaturedImage' => array(
				'type' => 'boolean',
				'default' => true
			)
		),
		'render' => 'file:./render.php'
	)
);
