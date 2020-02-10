if(!window.Promise) {
	alert("Browser you're using is not supported at all! Please use another browser.");
	document.body.className += ' Body--unsupported';
} else {
	import(/* webpackChunkName: "kaede-index" */ "@/index.js");
}
