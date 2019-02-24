(function () {
	"use strict";


	const Vue = require("vue");

	return new Vue({
		"el": "#app",
		"name": "main",
		"render": function (h) {
			return h(require("./components/app.vue"));
		}
	});



}());