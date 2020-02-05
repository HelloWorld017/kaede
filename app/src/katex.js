import "katex";
import "katex/dist/katex.css";

import autoRender from "katex/dist/contrib/auto-render.js";

export default function katex(content) {
	autoRender(content, {
		delimiters: [
			{ left: "$$", right: "$$", display: true },
			{ left: "$", right: "$", display: false },
			{ left: "\\[", right: "\\]", display: true },
			{ left: "\\(", right: "\\)", display: false }
		]
	});
}
