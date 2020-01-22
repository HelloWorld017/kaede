export default (post, columnWidth) => {
	// Roughly calculating post height.
	let height = 70;
	if(post.feature_image)
		height += 300;

	height += Math.max(7, Math.floor(post.excerpt.length * 16 / columnWidth)) * 16;

	return height;
};
