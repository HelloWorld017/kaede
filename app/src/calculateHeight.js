export default (post, columnWidth) => {
	// Roughly calculating post height.
	let height = 216;
	
	if(post.feature_image)
		height += 200;

	if(post.primary_tag)
		height += 35;

	height += Math.min(5, Math.ceil(post.excerpt.length * 8 / columnWidth)) * 25;

	return height;
};
