import axios from 'axios';
import GhostContentAPI from "@tryghost/content-api/lib";

export default new GhostContentAPI({
	url: location.origin,
	key: window.$KaedeGhostApiKey,
	version: 'v3'
});
