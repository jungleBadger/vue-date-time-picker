(function () {
	"use strict";

	module.exports = {
		"find": function(predicate) {
			if (this === null) {
				throw new TypeError("Array.prototype.find called on null or undefined");
			}
			if (typeof predicate !== "function") {
				throw new TypeError("predicate must be a function");
			}
			var list = Object(this);
			var length = list.length >>> 0;
			var thisArg = arguments[1];
			var value;

			for (var i = 0; i < length; i++) {
				value = list[i];
				if (predicate.call(thisArg, value, i, list)) {
					return value;
				}
			}
			return undefined;
		},
		"findIndex": function(predicate) {
			if (this === null) {
				throw new TypeError("Array.prototype.findIndex called on null or undefined");
			}
			if (typeof predicate !== "function") {
				throw new TypeError("predicate must be a function");
			}
			var list = Object(this);
			var length = list.length >>> 0;
			var thisArg = arguments[1];
			var value;

			for (var i = 0; i < length; i++) {
				value = list[i];
				if (predicate.call(thisArg, value, i, list)) {
					return i;
				}
			}
			return -1;
		},
		"composedPath": function () {
			var path = [];
			var el = this.target || this.srcElement;

			while (el) {
				path.push(el);
				if (el.tagName === "HTML") {
					path.push(document);
					path.push(window);
					return path;
				}
				el = el.parentElement;
			}
			return path;
		}
	}

}());