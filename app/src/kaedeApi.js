import axios from "axios";

const enabled = !!window.$KaedeApiServer;
const instance = enabled ?
	axios.create({
		baseURL: window.$KaedeApiServer,
	}) :
	null;

export default instance;
