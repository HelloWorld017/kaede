import { Parser } from "htmlparser2";

export default html => {
	const outline = [];
	let currentTag = null;
	let text = '';

	const parser = new Parser({
		onopentag(name) {
			if(currentTag) return;

			const heading = name.match(/^h([1-6])$/i);
			if(!heading) return;

			currentTag = {
				name,
				level: heading[1]
			};
		},

		ontext(t) {
			if(currentTag !== null)
				text += t;
		},

		onclosetag(name) {
			if(!(currentTag !== null && currentTag.name === name))
				return;

			outline.push({
				level: currentTag.level,
				text
			});

			currentTag = null;
			text = '';
		}
	}, { decodeEntities: true });

	parser.write(html);
	parser.end();

	const topLevel = Math.min(...outline.map(v => v.level));
	return outline.filter(v => {
		v.level -= topLevel;

		if(v.level > 2) return false;
		return true;
	});
};
