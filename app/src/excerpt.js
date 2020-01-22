import sanitizeHtml from "sanitize-html";

const getExcerpt = content => {
	return sanitizeHtml(content, {
		allowedTags: ['b', 'i', 'em', 'a', 'code'],
		allowedAttributes: {
			a: ['href'],
		},
		allowedIframeHostnames: [],
		allowedSchemesByTag: {
			'a': ['http', 'https', 'mailto'],
		},
		allowedSchemesAppliedToAttributes: ['href', 'src'],
		allowProtocolRelative: true
	});
};

export default getExcerpt;
