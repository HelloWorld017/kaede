import dateLocale from "@/src/dateLocale";
import { formatDistance } from "date-fns";

export default post => {
	const seconds = post.reading_time * 60 + 25;
	const now = Date.now();

	return formatDistance(new Date(now), new Date(now + seconds * 1000), dateLocale());
};
