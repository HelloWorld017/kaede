import { Parser } from "htmlparser2";
import moment from "moment";

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

	return moment.duration(seconds, "seconds").humanize();
};
