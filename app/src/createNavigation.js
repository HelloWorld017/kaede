const UL_OPEN = /<ul[^>]*>/i;
const UL_CLOSE = /<\/ul>/i;
const LI_OPEN = /<li[^>]*>/i;
const LI_CLOSE = /<\/li>/i;
const A_ATOMIC = /<a([^>]*)>([^]*?)<\/a>/i;
const A_HREF = /\s+href="([^"]*)"/i;

const REGEX_LIST = [
	{ name: 'UL_O', regex: UL_OPEN },
	{ name: 'UL_C', regex: UL_CLOSE },
	{ name: 'LI_O', regex: LI_OPEN },
	{ name: 'LI_C', regex: LI_CLOSE },
	{ name: 'A_A', regex: A_ATOMIC }
];

const decodeEntity = html => {
	const txt = document.createElement("textarea");
	txt.innerHTML = html;

	return txt.value;
};

const tokenize = html => {
	const tokens = [];
	while (true) {
		const { distance, token } = REGEX_LIST.reduce((prev, curr) => {
			const match = html.match(curr.regex);
			if(match && match.index < prev.distance)
				return { distance: match.index, token: { name: curr.name, regex: curr.regex, match } };

			return prev;
		}, { distance: Infinity, token: null });

		if(distance === Infinity) {
			tokens.push(html);
			break;
		} else {
			const chunk = html.substring(0, distance);
			if(chunk.trim())
				tokens.push(chunk.trim());

			tokens.push(token);
			html = html.slice(distance).replace(token.regex, '');
		}
	}

	return tokens;
};

const findMatchingTag = (tokens, start, openTag, closeTag) => {
	for(let i = start; i < tokens.length; i++) {
		if(tokens[i].name !== openTag) continue;

		let j = i + 1;
		let level = 1;
		for(; j < tokens.length; j++) {
			if(tokens[j].name === openTag) level++;
			if(tokens[j].name === closeTag) level--;

			if(level === 0) {
				break;
			}
		}

		const content = tokens.slice(i, j + 1);
		return {
			open: i,
			close: j,
			content
		};
	}

	return null;
};

const parseAll = tokens => {
	const navigation = [];
	let matchingTag = null;
	let i = 0;

	while((matchingTag = findMatchingTag(tokens, i, 'UL_O', 'UL_C')) !== null) {
		navigation.push(...parseUlContent(matchingTag.content));
		i = matchingTag.close + 1;
	}
};

const parseUlContent = tokens => {
	const liList = [];
	while((matchingTag = findMatchingTag(tokens, i, 'LI_O', 'LI_C')) !== null) {
		liList.push(...parseLiContent(matchingTag.content));
		i = matchingTag.close + 1;
	}

	return liList;
};

const parseLiContent = tokens => {
	const content = [];
	for(let i = 0; i < tokens.length; i++) {
		if(typeof tokens[i] === 'string') {
			content.push(tokens[i]);
			continue;
		}

		if(tokens[i].name === 'UL_O') {
			const matchingTag = findMatchingTag(tokens, i, 'UL_O', 'UL_C');
			if(matchingTag !== null) {
				content.push(parseUlContent(matchingTag.content));
				i = matchingTag.close + 1;
			}
		} else if(tokens[i].name === 'A_A') {
			const { text, href } = parseA(tokens[i]);

			content.push({
				type: 'link',
				text,
				href
			});
		}
	}

	return content;
};

const parseA = token => {
	const hrefMatcher = token.token.match[1].match(A_HREF);
	const href = hrefMatcher ? decodeEntity(hrefMatcher[1]) : '#';
	const text = decodeEntity(token.token.match[2]);

	return { href, text };
};

export default html => {
	const tokens = tokenize(html);
	return parseAll(tokens);
};

export const importNav = navigation => {
	return navigation.map(({ url, label }) => {
		return {
			type: 'link',
			text: label,
			href: url
		};
	});
};
