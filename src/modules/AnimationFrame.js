/*
==================================================================================================
Core - JavaScript Foundation
Copyright 2010-2012 Zynga Inc.
Copyright 2012-2013 Sebastian Werner
--------------------------------------------------------------------------------------------------
Inspired by: https://github.com/inexorabletash/raf-shim/blob/master/raf.js
==================================================================================================
*/

var AnimationFrame = (function () {
	var getKeys = function (obj) {
		return Object.keys ? Object.keys(obj) : (function () {
			var keys = [], key;

			for (key in obj) {
				keys.push(key);
			}

			return keys;
		}());
	};

	var isEmpty = function (obj) {
		// null and undefined are empty
		if (obj === null || obj === undefined) {
			return true;
		}

		// Assume if it has a length property with a non-zero value
		// that that property is correct.
		if (obj.length && obj.length > 0) {
			return false;
		}

		if (obj.length === 0) {
			return true;
		}

		// Speed up calls to hasOwnProperty
		var hasOwnProperty = Object.prototype.hasOwnProperty;

		for (var key in obj) {
			if (hasOwnProperty.call(obj, key)) {
				return false;
			}
		}

		// Doesn't handle toString and toValue enumeration bugs in IE < 9
		return true;
	};

	var lastTime = 0,
		vendors = ['moz', 'webkit', 'o', 'ms'],
		request, cancel, x;

	// Remove vendor prefixing if prefixed and break early if not
	for (x = 0; x < vendors.length && !global.requestAnimationFrame; x += 1) {
		request = global[vendors[x] + 'RequestAnimationFrame'];
		cancel = global[vendors[x] + 'CancelAnimationFrame'] || global[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (request) {
		// Prefer native support: Resolve returned name on global object.
		// Bind to window because otherwise it throws errors in V8 and maybe other engines.
		request = global[request].bind(global);
		cancel = global[cancel].bind(global);
	} else {
		// Custom implementation
		var TARGET_FPS = 60;
		var requests = {};
		var rafHandle = 1;
		var timeoutHandle = null;

		/**
		 * {var} Tells the browser that you wish to perform an animation; this requests that the browser schedule a
		 * repaint of the window for the next animation frame. The method takes as an argument a @callback {Function} to
		 * be invoked before the repaint and a @root {Element?} to specifying the element that visually bounds the entire animation.
		 * Returns a handle to cancel the request using {#cancel}.
		 *
		 * See also: https://developer.mozilla.org/en/DOM/window.requestAnimationFrame
		 */
		request = function (callback, root) {
			var callbackHandle = rafHandle++;

			// Store callback
			requests[callbackHandle] = callback;

			// Create timeout at first request
			if (timeoutHandle === null) {
				timeoutHandle = setTimeout(function () {
					var time = Date.now();
					var currentRequests = requests;
					var keys = getKeys(currentRequests);

					// Reset data structure before executing callbacks
					requests = {};
					timeoutHandle = null;

					// Process all callbacks
					for (var i = 0, l = keys.length; i < l; i++) {
						currentRequests[keys[i]](time);
					}
				}, 1000 / TARGET_FPS);
			}

			return callbackHandle;
		};

		/**
		 * Stops the animation scheduled under the given @handle {var}.
		 *
		 * See also: https://developer.mozilla.org/en/DOM/window.requestAnimationFrame
		 */
		cancel = function (handle) {
			delete requests[handle];

			// Stop timeout if all where removed
			if (isEmpty(requests)) {
				clearTimeout(timeoutHandle);
				timeoutHandle = null;
			}
		};
	}

	/**
	 * Module to request a function call for the next render loop.
	 *
	 * Used native methods where possible but includes a fallback to
	 * a custom timeout based logic.
	 */
	return {
		request : request,
		cancel : cancel
	};

}());
