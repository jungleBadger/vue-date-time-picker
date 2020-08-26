<template>
	<section class="calendar">
		<calendar-header
			:days="days"
			:months="months"
			:selectedMonth="selectedMonth"
			:selectedYear="selectedYear"
			@updateMonth="changeSelectedDate"
		></calendar-header>
		<main class="calendar-body">
			<span
				v-for="day in remainderDays">
			</span>
			<calendar-date-small
				v-for="day in daysAmount"
				:context="'current'"
				:day="day"
				:minDate="minDateProcessed"
				:selectedDate="selectedDate"
				:selectedMonth="selectedMonth"
				:selectedYear="selectedYear"
				:rangedPoint="rangedPoint"
				@selectDate="updateDate"
				:referenceDate="referenceDate"
				:customTimeZone="customTimeZone"
				:key="day">
				{{day}}
			</calendar-date-small>
			<span
				v-for="day in extraDays">
			</span>
		</main>
	</section>
</template>
<script type="text/javascript">
(function () {
	"use strict";
	const DateTime = require("luxon").DateTime;

	module.exports = {
		"name": "CalendarBase",
		"components": {
			"CalendarHeader": require("./calendar-header.vue"),
			"CalendarDateSmall": require("./calendar-date-small.vue")
		},
		"props": {
			"selectedDate": {
				"type": [String, Object],
				"required": false,
				"default": function () {
					return "";
				}
			},
			"customTimeZone": {
				"type": String,
				"required": false
			},
			"minDate": {
				"type": [String, Object],
				"required": false
			},
			"referenceDate": {
				"type": [String, Object],
				"required": false
			},
			"rangedPoint": {
				"type": String,
				"required": false
			},
			"days": {
				"type": Object,
				"required": true
			},
			"months": {
				"type": Object,
				"required": true
			},
			"weekPattern": {
				"type": String,
				"required": false,
				"default": function() {
					return "default";
				}
			}
		},
		"data": function() {
			return {
			}
		},

		"computed": {
			"selectedMonth": function () {
				return this.selectedDate ? new Date(this.selectedDate).getMonth() : new Date().getMonth();
			},
			"selectedYear": function () {
				return this.selectedDate ? new Date(this.selectedDate).getFullYear() : new Date().getFullYear();
			},
			"remainderDays": function () {
				let arr = [];
				for (let i = this.firstDayOfTheMonth; i >= 1; i -= 1) {
					arr.push((this.lastDayPreviousMonth + 1) - i);
				}
				return arr;
			},
			"extraDays": function () {
				let filledDays = this.daysAmount + this.remainderDays.length;
				let arrayLength = Math.abs(((Math.ceil(filledDays / 7) * 7) - filledDays) || 0);
				return Array(arrayLength).fill(null);
			},
			"daysAmount": function () {
				return 32 - new Date(this.selectedYear, this.selectedMonth, 32).getDate();
			},
			"firstDayOfTheMonth": function () {
				let day = new Date(this.selectedYear, this.selectedMonth, 1).getDay();
				if (this.weekPattern === "iso") {
					return day === 0 ? 6 : day - 1;
				} else {
					return day;
				}

			},
			"lastDayPreviousMonth": function () {
				return DateTime.fromObject({
					"year": this.selectedYear,
					"month": this.selectedMonth + 1,
					"day": 1
				}).setZone(this.customTimeZone || "local").minus({"days": 1}).date;
			},
			"minDateProcessed": function () {
				return this.minDate ? DateTime.fromJSDate(new Date(this.minDate)).setZone(this.customTimeZone || "local") : null;
			}
		},
		"methods": {
			updateDate(val) {
				this.$emit("dateSelected", val);
			},
			changeSelectedDate(info) {
				this.selectedMonth = info.month;
				this.selectedYear = info.year;
			}
		},
		"mounted": function () {
			if (this.referenceDate) {
				this.selectedMonth = this.referenceDate.month -1;
				this.selectedYear = this.referenceDate.year;
			}
		},
		"watch": {
			"referenceDate": function () {
				if (this.referenceDate) {
					this.selectedMonth = this.referenceDate.month -1;
					this.selectedYear = this.referenceDate.year;
				}
			},

		}
	};
}());
</script>
<style scoped lang="scss" rel="stylesheet/scss">
	.calendar {
		display: flex;
		height: 100%;
		width: 100%;
		-webkit-box-flex: 1;
		-ms-flex: 1;
		flex: 1;
		font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		z-index: 1;
		.calendar-body {
			display: grid;
			grid-template-columns: repeat(7, minmax(38px, 1fr));
			align-content: flex-start;
			grid-gap: 0px;
			justify-items: center;
			font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
			flex: 1;
			span {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>
