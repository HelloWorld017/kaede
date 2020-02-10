import 'core-js/features/promise';
import 'core-js';
import './index.js';

(async () => {
	if(!Array.prototype.includes) {
		alert("This browser is not supported. Please consider upgrading!");
		await import("core-js");
	}

	if(!window.IntersectionObserver) {
		console.log("1");
		await import("intersection-observer");
	}

	//Done loading!
	console.log("2");
	await import("./index.js");
})();
