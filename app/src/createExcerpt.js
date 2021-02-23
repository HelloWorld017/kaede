const getExcerpt = content => {
	if (!content)
		return '';
	
	let excerpt = content.replace(/<a href="#fn.*?rel="footnote">.*?<\/a>/gi, '');
	excerpt = excerpt.replace(/<div class="footnotes"><ol>.*?<\/ol><\/div>/, '');
	excerpt = excerpt.replace(/<\/?[^>]+>/gi, ' ');
	excerpt = excerpt.replace(/(\s)+/gm, ' ');

	return excerpt;
};

export default getExcerpt;
