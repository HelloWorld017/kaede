export default (post, columnWidth) => {
	// Roughly calculating post height.
	let height = 250;
	if(post.feature_image)
		height += 200;

	height += Math.min(7, Math.ceil(post.excerpt.length * 8 / columnWidth)) * 25;

	return height;
};
