import dateLocale from "@/src/dateLocale";
import { formatDistance } from "date-fns";
import { Parser } from "htmlparser2";

const wps = 275 / 60;

export default (excerpt, post) => {
	const words = excerpt.split(/\s+/).length;
	let images = 0;

	const parser = new Parser({
		onopentag(name) {
			if(name.toLowerCase() === 'img') {
				images++;
			}
		}
	});

	parser.write(post.html);
	parser.end();

	let seconds = Math.ceil(words / wps);

	for(let i = 0; i < images; i++) {
		seconds += Math.max(3, 12 - i);
	}

	const now = Date.now();

	return formatDistance(new Date(now), new Date(now + seconds * 1000), dateLocale());
};
