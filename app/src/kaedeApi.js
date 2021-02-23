import axios from "axios";
import kaedeSettings from "@/src/kaedeSettings";

const enabled = !!kaedeSettings.apiServer;
const instance = enabled ?
	axios.create({
		baseURL: kaedeSettings.apiServer,
		validateStatus: false
	}) :
	null;

export default instance;
