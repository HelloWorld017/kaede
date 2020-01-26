import GhostContentAPI from "@tryghost/content-api";

export default new GhostContentAPI({
	url: location.origin,
	key: window.$KaedeGhostApiKey,
	version: 'v3'
});
