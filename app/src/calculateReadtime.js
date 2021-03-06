import dateLocale from "@/src/dateLocale";
import { formatDistance } from "date-fns";
import kaedeSettings from "./kaedeSettings";

export default post => {
	if (!post.reading_time)
		return 0;
	
	const seconds = (post.reading_time * 60 + 25) * kaedeSettings.readTimeMultiplier;
	const now = Date.now();

	return formatDistance(new Date(now), new Date(now + seconds * 1000), dateLocale());
};
