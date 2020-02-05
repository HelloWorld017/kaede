const supportPageOffset = window.pageXOffset !== undefined;
const isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

export default () => supportPageOffset ?
	window.pageYOffset :
		isCSS1Compat ?
		document.documentElement.scrollTop :
		document.body.scrollTop;
