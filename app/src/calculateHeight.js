export default (post, columnWidth) => {
	// Roughly calculating post height.
	let height = 216;

	if(post.feature_image)
		height += 200;

	if(post.primary_tag)
		height += 35;

	const excerptLength = post.excerpt ? post.excerpt.length : 0;
	height += Math.min(5, Math.ceil(excerptLength * 8 / columnWidth)) * 25;

	return height;
};
