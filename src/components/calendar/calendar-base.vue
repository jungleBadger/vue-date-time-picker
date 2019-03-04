<template>
	<section class="calendar">
		<calendar-header
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
				:minDate="minDate"
				:selectedDate="selectedDate"
				:selectedMonth="selectedMonth"
				:selectedYear="selectedYear"
				:rangedPoint="rangedPoint"
				@selectDate="updateDate"
				:referenceDate="referenceDate"
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
			}
		},
		"data": function() {
			return {
				"selectedMonth": new Date().getMonth(),
				"selectedYear": new Date().getFullYear(),
				"days": {},
				"months": {}
			}
		},
		"computed": {
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
				return new Date(this.selectedYear, this.selectedMonth).getDay();
			},
			"lastDayPreviousMonth": function () {
				return new Date(new Date(this.selectedYear, this.selectedMonth).getTime() - (1000 * 60 * 60 * 23)).getDate();
			},
			"firstDayLabel": function () {
				return this.days[this.firstDayOfTheMonth];
			},
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
		"beforeMount": function () {
			require("luxon").Info.weekdays().forEach((day, index) => {
				this.days[index] = day.charAt(0).toUpperCase() + day.slice(1);
			});

			require("luxon").Info.months().forEach((month, index) => {
				this.months[index] = month.charAt(0).toUpperCase() + month.slice(1);
			});
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
			}
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
		.calendar-body {
			display: grid;
			grid-template-columns: repeat(7, 1fr);
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
