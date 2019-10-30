<template>
	<div id="app">
		<section>
			<h3>Simple date and time selector</h3>
			<div class="input-wrapper">
				<label>
					<date-time-picker v-model="test" :minDate="today"></date-time-picker>
				</label>
			</div>

		</section>
		<section>
			<h3>Simple date and time selector with different time-zone</h3>
			<div class="input-wrapper">
				<label>
					<date-time-picker v-model="test2" :minDate="today" :customTimeZone="'America/New_York'"></date-time-picker>
				</label>
			</div>

		</section>
		<section>
			<h3>Date picker with different week patterns</h3>
			<div class="input-wrapper">
				<label>
					<date-time-picker v-model="test3" :minDate="today" :weekPattern="weekPattern"></date-time-picker>
				</label>
			</div>
			<div>
				<button class="button" @click="changeWeekPattern('iso')" :class="{'__is-selected': weekPattern === 'iso'}">
					Use ISO week scheme(Monday to Sunday)
				</button>
				<button class="button" @click="changeWeekPattern('default')" :class="{'__is-selected': weekPattern === 'default'}">
					Use US week scheme(Sunday to Saturday)
				</button>
			</div>

		</section>
		<section>
			<h3>Two inputs connected with start and end date</h3>
			<div class="input-wrapper">
				<label>
					<date-time-picker v-model="rangeStart" :minDate="today" :rangedPoint="'start'" :customTimeZone="'America/New_York'"></date-time-picker>

				</label>
				<label>
					<date-time-picker v-model="rangeEnd" :minDate="rangeStart" :referenceDate="rangeStart" :rangedPoint="'end'" :customTimeZone="'America/New_York'"></date-time-picker>
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
				"test3": new Date(),
				"today": new Date(),
				"rangeStart": "",
				"rangeEnd": "",
				"weekPattern": "default"
			}
		},
		"methods": {
			changeWeekPattern(scheme) {
				this.weekPattern = scheme;
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
