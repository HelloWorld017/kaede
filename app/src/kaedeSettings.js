const settings = {
	apiServer: window.$KaedeApiServer,
	bookmarkEnabled: window.$KaedeBookmarkEnabled,
	commentsMaxAuthor: window.$KaedeCommentsMaxAuthor || 32,
	commentsMaxContent: window.$KaedeCommentsMaxContent || 1500,
	fullNavigation: window.$KaedeFullNavigation,
	ghostApiKey: window.$KaedeGhostApiKey,
	featuredTags: window.$KaedeFeaturedTags
};

export default settings;
