import axios from 'axios';
import kaedeSettings from "@/src/kaedeSettings";
import GhostContentAPI from "@tryghost/content-api/lib";

export default new GhostContentAPI({
	url: location.origin,
	key: kaedeSettings.ghostApiKey,
	version: 'v3'
});
