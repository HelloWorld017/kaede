import GhostContentAPI from "@tryghost/content-api";

export default new GhostContentAPI({
	url: location.origin,
	key: window.$KaedeApiKey,
	version: 'v3'
});
