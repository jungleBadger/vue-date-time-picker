<template>
	<div
		:class="{
		'__is-today': isToday,
		'__is-selected': isSelected,
		'__is-inactive': isInactive,
		'__is-interval': intervalInfo.isInterval,
		'__is-interval-start': intervalInfo.isIntervalStart || (isReferenceDate && rangedPoint === 'end'),
		'__is-interval-end': intervalInfo.isIntervalEnd
		}"
		class="calendar-date"
		@click.stop="updateDate">
		<span class="calendar-date-value">
			{{day}}
		</span>
	</div>
</template>
<script type="text/javascript">
(function () {
	"use strict";

	const DateTime = require("luxon").DateTime;
	const Interval = require("luxon").Interval;

	module.exports = {
		"name": "CalendarDateSmall",
		"components": {
		},
		"props": {
			"day": {
				"type": Number,
				"required": true
			},
			"context": {
				"type": String,
				"required": true
			},
			"selectedDate": {
				"type": [String, Object],
				"required": false
			},
			"selectedMonth": {
				"type": Number,
				"required": true
			},
			"selectedYear": {
				"type": Number,
				"required": true
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
			}
		},
		"computed": {
			"contextDate": function () {
				let month;
				let yearFactor = 0;
				if (this.context === "past") {
					month = this.selectedMonth - 1;
				} else if (this.context === "future") {
					month = this.selectedMonth + 1;
				} else {
					month = this.selectedMonth;
				}
				month += 1;
				month = month > 12 ? 12 : month;
				if (month === 0) {
					month = 12;
					yearFactor = 1;
				} else if (month > 12) {
					month = 1;
					yearFactor = -1;
				}

				return DateTime.fromObject({
					"year": this.selectedYear - yearFactor,
					"month": month,
					"day": this.day,
					"hour": this.selectedDate ? (this.selectedDate.hour || 0) : 0,
					"minute": this.selectedDate ? (this.selectedDate.minute || 0) : 0
				});
			},
			"isToday": function () {
				let today = DateTime.fromObject(new Date());
				return (
					today.day === this.contextDate.day &&
					today.month === this.contextDate.month &&
					today.year === this.contextDate.year
				);
			},
			"isSelected": function () {
				return this.selectedDate && (
					this.selectedDate.day === this.contextDate.day &&
					this.selectedDate.month === this.contextDate.month &&
					this.selectedDate.year === this.contextDate.year
				);
			},
			"isInactive": function () {
				return this.contextDate < this.minDate;
			},
			"isReferenceDate": function () {
				return this.referenceDate && (
					this.referenceDate.day === this.contextDate.day &&
					this.referenceDate.month === this.contextDate.month &&
					this.referenceDate.year === this.contextDate.year
				);
			},
			"intervalInfo": function () {
				if (this.referenceDate && this.minDate && this.selectedDate) {
					let interval;
					if (this.rangedPoint === "start") {
						interval = Interval.fromDateTimes(
							this.selectedDate,
							this.referenceDate
						);
					} else {
						interval = Interval.fromDateTimes(
							this.referenceDate,
							this.selectedDate
						);
					}
					return {
						"isInterval": interval.contains(this.contextDate),
						"isIntervalStart": interval.start && (interval.start.day === this.contextDate.day)
							&& (interval.start.month === this.contextDate.month) &&
							(interval.start.year === this.contextDate.year),
						"isIntervalEnd": interval.end && (interval.end.day === this.contextDate.day)
							&& (interval.end.month === this.contextDate.month) &&
							(interval.end.year === this.contextDate.year)
					};

				} else {
					return {};
				}
			}
		},
		"methods": {
			updateDate() {
				if (this.isInactive) {
					return false;
				}
				this.$emit("selectDate", this.contextDate);
			}
		}
	};
}());
</script>
<style scoped lang="scss" rel="stylesheet/scss">
	@import "../../scss/variables.scss";


	.calendar-date {
		max-width: 100%;
		max-height: 100%;
		text-align: center;
		cursor: pointer;
		padding: 7px;
		transition: background-color 0.2s;
		position: relative;
		font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;


		&.__is-selected {
			background-color: #295C99;
			.calendar-date-value {
				color: white;
				font-weight: bold;
			}
		}

		&.__is-today {
			.calendar-date-value {
				&::after {
					content: "Today";
					font-size: 8px;
					position: absolute;
					bottom: 5px;
				}
			}
		}

		&.__is-inactive {
			opacity: 0.5;
			cursor: not-allowed !important;

		}
		&.__is-busy {
			opacity: 0.5;
			cursor: not-allowed !important;
			background-color: gainsboro;
			border-radius: 0;
		}

		&.__is-interval {
			background-color: #7594b9;
			color: white;

		}

		&.__is-interval-start {
			&::before {
				content: "S" !important;
				position: absolute;
				left: 2px;
				top: 0;
				font-size: 8px;
			}
			background-color: #295C99;
			color: white;

		}

		&.__is-interval-end {
			&::after {
				content: "E";
				position: absolute;
				right: 2px;
				top: 0;
				font-size: 8px;
			}
			background-color: #295C99;
			color: white;
		}

		.calendar-date-value {
			border-radius: 50%;
			width: 30px;
			height: 30px;
			max-width: 100%;
			max-height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

	}

</style>
