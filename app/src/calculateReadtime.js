import dateLocale from "@/src/dateLocale";
import { formatDistance } from "date-fns";
import kaedeSettings from "./kaedeSettings";

export default post => {
	const readingTime = post.reading_time || 0;

	const seconds = (readingTime * 60 * kaedeSettings.readTimeMultiplier) + 25;
	const now = Date.now();

	return formatDistance(new Date(now), new Date(now + seconds * 1000), dateLocale());
};
