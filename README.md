### Vue-Date-Time-Picker

> Simple date and time picker built with Vue 2.x+ and using `Luxon` to handle dates


### How to use
Do a regular `npm install vue-date-time-picker` and the file can be imported either through `require` or `import`. There is no need of CSS imports since all styles are scoped into the components

```js
<template>
	<div id="app">
		<date-time-picker v-model="test"></date-time-picker>
	</div>
</template>
<script type="text/javascript">
(function () {
	"use strict";
	module.exports = {
		"name": "App",
		"components": {
			"DateTimePicker": require("vue-date-time-picker").DateTimePicker
		},
		"data": function() {
			return {
				"test": new Date()
			}
		}
	};
}());
</script>
<style scoped lang="scss" rel="stylesheet/scss"></style>
```

### Properties

|Prop   |Required   |Default   |Details   |
|---|---|---|---|
|elId   |false   | String: `"a" + Date.now()`  |ID to attach to HTML element   |
|value/v-model   |true   | String/Object/Date: `undefined`   | Reactive variable to hold date selection value  |
|minDate   |false   |String/Object/Date: `undefined`   | Minimum date to control which dates can be selected|
|referenceDate   |false   |String/Object/Date: `undefined`   |Date to be used as reference, or to define a range between two date-pickers instance   |
|rangedPoint   |false   |String: `undefined`   |This should be used to work with ranged dates with two date pickers instance, one will be `start` and the another will be `end`   |
|placeholder   |false   |String: `Insert date`   |Input placeholder   |



### Roadmap

This project is still on development and on its early phases. I had the need of such a component on my work so I thought that would be nice to open source it and keep improving over time. Any contributions, feature requests, feedbacks and/or tips are very well appreaciated. Feel free to open a PR or raise an issue at the Issues section. 

Next features / needing help
* Replace `luxon` by a vanilla js approach to reduce footprint
* Handle events
* Create more customisation options and enhance the ranged feature 
* Create a more complete sample page



### Contributing
This project relies on Gulp.js and Babel to perform transformations. All css applied is bundled to each component.

1. run `npm install`
2. run `gulp build` to apply the changes
3. The source code is under the `src` folder, and the `js/main.js` file is responsible to loading up the Vue.js component through `components/date-time-picker` instance
4. Some css variables can be found under the `src/scss/variables.scss` file, this can be useful to customize the component
