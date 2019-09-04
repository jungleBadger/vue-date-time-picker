<template>
	<div id="app">
		<section>
			<h3>Simple date and time selector</h3>
			<div class="input-wrapper">
				<label>
					<date-time-picker v-model="test"></date-time-picker>
				</label>
			</div>

		</section>
		<section>
			<h3>Simple date and time selector with different time-zone</h3>
			<div class="input-wrapper">
				<label>
					<date-time-picker v-model="test2" :customTimeZone="'America/New_York'"></date-time-picker>
				</label>
			</div>

		</section>
		<section>
			<h3>Two inputs connected with start and end date</h3>
			<div class="input-wrapper">
				<label>
					<date-time-picker v-model="rangeStart" :minDate="today" :rangedPoint="'start'"></date-time-picker>

				</label>
				<label>
					<date-time-picker v-model="rangeEnd" :minDate="rangeStart" :referenceDate="rangeStart" :rangedPoint="'end'"></date-time-picker>
				</label>
			</div>

		</section>
	</div>
</template>
<script type="text/javascript">
(function () {
	"use strict";
	module.exports = {
		"name": "App",
		"components": {
			"DateTimePicker": require("../../../dist/js/bundle.js").DateTimePicker
		},
		"data": function() {
			return {
				"test": new Date(),
				"test2": new Date(),
				"today": new Date(),
				"rangeStart": "",
				"rangeEnd": ""
			}
		}
	};
}());
</script>
<style scoped lang="scss" rel="stylesheet/scss">
	#app {
		height: 100%;
		padding: 21px;
		width: 100%;
		box-sizing: border-box;
		.input-wrapper {
			display: flex;
			flex-wrap: wrap;
			label {
				margin: 7px;
				flex: 1;
			}
		}
	}


</style>
