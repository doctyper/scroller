// Uses AMD or browser globals to create a module.
if (typeof define === "function" && define.amd) {
	define(function () {
		return Scroller;
	});
} else {
	global.Scroller = Scroller;
}
