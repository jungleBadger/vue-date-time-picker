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
		tabindex="0"
		class="calendar-date"
		:aria-label="contextDate.toString()"
		@keyup.space.stop="updateDate"
		@click.stop="updateDate">
		<span class="calendar-date-value" v-once>
			{{day > 9 ? day : `0${day}`}}
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
		"props": {
			"day": {
				"type": Number,
				"required": true
			},
			"customTimeZone": {
				"type": String,
				"required": false
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
					"minute": this.selectedDate ? (this.selectedDate.minute || 0) : 0,
					"zone": this.customTimeZone || "local"
				});
			},
			"isToday": function () {
				return this.contextDate.hasSame(DateTime.fromObject(new Date()).setZone(this.customTimeZone || "local"), "day");
			},
			"isSelected": function () {
				return this.contextDate.hasSame(this.selectedDate, "day");
			},
			"isInactive": function () {
				return this.minDate && (
					this.contextDate < this.minDate
				);
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
		width: 100%;
		min-width: 40px;
		height: 40px;
		text-align: center;
		cursor: pointer;
		padding: 7px;
		transition: background-color 0.2s;
		position: relative;
		font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
		box-sizing: border-box;

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
					content: "";
					font-size: 8px;
					position: absolute;
					bottom: 5px;
					border: 1px solid #5596e6;
					width: 60%;
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
			width: 100%;
			height: 100%;
			max-width: 100%;
			max-height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-family: 'IBM Plex Mono', monospace;
			font-weight: 300;
		}

	}

</style>
