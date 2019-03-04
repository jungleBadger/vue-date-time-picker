(function () {
	"use strict";

	if (!Array.prototype.find) { Array.prototype.find = require("./polyfills/polyfills").find; }
	if (!new Event("test").composedPath) {Event.prototype.composedPath = require("./polyfills/polyfills").composedPath}

	module.exports = {
		"DateTimePicker": require("../components/date-time-picker/date-time-picker.vue")
	}
}());