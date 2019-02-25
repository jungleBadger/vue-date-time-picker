<template>
	<div class="date-time-picker-wrapper">
		<div class="date-time-picker-input-wrapper">
			<span class="date-time-picker-input-icon is-left">
				<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="calendar-edit" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-calendar-edit fa-w-14"><path data-v-73c93c5b="" fill="currentColor" d="M243.1 234.1l46.8 46.8c2 2 2 5.2 0 7.2L175.4 402.6l-48.2 5.4c-6.4.7-11.9-4.7-11.2-11.2l5.4-48.2 114.5-114.5c2-2 5.2-2 7.2 0zm83-10.8l-25.4-25.4c-7.9-7.9-20.7-7.9-28.6 0l-19.5 19.5c-2 2-2 5.2 0 7.2l46.8 46.8c2 2 5.2 2 7.2 0l19.5-19.5c7.9-7.9 7.9-20.7 0-28.6zM448 112v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z" class=""></path></svg>
			</span>
			<input
				class="date-time-picker-input" @focus="showDateTimePicker"
				:value="selectedDateFormatted" :placeholder="inputPlaceholder"/>
			<span class="date-time-picker-input-icon is-right">
				<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-caret-down fa-w-10"><path data-v-215f89b8="" fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" class=""></path></svg>
			</span>
		</div>
		<aside v-show="appear" ref="popup" :id="elId" class="date-time-picker-popup">
			<calendar-base
				:minDate="minDateObject"
				:referenceDate="referenceDateObject"
				:rangedPoint="rangedPoint"
				:selectedDate="selectedDate"
				@dateSelected="updateDate">
			</calendar-base>
			<template v-if="selectedDate">
				<time-picker
					:selectedHour="selectedHour"
					:selectedMinute="selectedMinute"
					@confirmSelection="confirmSelection"
					@cancelSelection="cancelSelection"
					@timeSelected="updateTime">
				</time-picker>
			</template>
		</aside>
	</div>
</template>
<script type="text/javascript">
(function () {
	"use strict";

	const CLICK_EVENT = document.documentElement.ontouchstart ? "ontouchstart" : "mousedown";
	const DateTime = require("luxon").DateTime;

	module.exports = {
		"name": "DateTimePicker",
		"components": {
			"CalendarBase": require("../calendar/calendar-base.vue"),
			"TimePicker": require("../time-picker/time-picker.vue")
		},
		"mixins": [
		],
		"directives": {
		},
		"props": {
			"elId": {
				"type": String,
				"required": false,
				"default": function () {
					return "a" + Date.now();
				}
			},
			"value": {
				"type": [String, Object, Date],
				"required": true
			},
			"minDate": {
				"type": [String, Object, Date],
				"required": false
			},
			"referenceDate": {
				"type": [String, Object, Date],
				"required": false
			},
			"rangedPoint": {
				"type": String,
				"required": false
			},
			"placeholder": {
				"type": String,
				"required": false
			}
		},
		"data": function() {
			return {
				"appear": false,
				"selectedDate": "",
				"selectedTime": "",
				"cachedValue": ""
			}
		},
		"computed": {
			"inputPlaceholder": function () {
				return this.placeholder || "Insert date";
			},
			"minDateObject": function () {
				let minDate = new Date(this.minDate);

				return this.minDate ? DateTime.fromObject({
					"day": minDate.day || minDate.getDate(),
					"month": minDate.month || minDate.getMonth() + 1,
					"year": minDate.year || minDate.getFullYear(),
					"hour": 0,
					"minute": 0
				}) : "";
			},
			"referenceDateObject": function () {
				return this.referenceDate ? DateTime.fromObject({
					"day": this.referenceDate.day || this.referenceDate.getDate(),
					"month": this.referenceDate.month || this.referenceDate.getMonth() + 1,
					"year": this.referenceDate.year || this.referenceDate.getFullYear(),
					"hour": 0,
					"minute": 0
				}) : "";
			},
			"selectedDateFormatted": function () {
				return this.selectedDate ? DateTime.local(
					this.selectedDate.year,
					this.selectedDate.month,
					this.selectedDate.day,
					this.selectedDate.hour,
					this.selectedDate.minute
				).toLocaleString(DateTime.DATETIME_HUGE) : "";
			},
			"selectedHour": function () {
				if (this.selectedDate) {
					return this.selectedDate.hour;
				} else {
					return 0;
				}
			},
			"selectedMinute": function () {
				if (this.selectedDate) {
					return this.selectedDate.minute;
				} else {
					return 0;
				}
			},
		},
		"methods": {
			clickMonitor(ev) {
				var composed = ev.composedPath();
				let x = composed.find(element => {
					return element.parentElement && element.parentElement.id === this.elId;
				});

				if (!x) {
					if (this.minDateObject >= this.selectedDate) {
						this.cancelSelection();
					} else {
						this.$emit("input", this.selectedDate);
						this.hideDateTimePicker();
					}
				}
			},
			showDateTimePicker() {
				this.cachedValue = this.value;
				this.appear = true;
				document.addEventListener(CLICK_EVENT, this.clickMonitor);
			},
			hideDateTimePicker() {
				document.removeEventListener(CLICK_EVENT, this.clickMonitor);
				this.cachedValue = "";
				this.appear = false;
				this.$emit("close");
			},
			updateDate(val) {
				this.selectedDate = val;
			},
			updateTime(val) {
				this.selectedDate = this.selectedDate.set(val);
			},
			cancelSelection() {
				if (this.cachedValue) {
					let date = new Date(this.cachedValue);
					this.selectedDate = DateTime.fromObject({
						"year": date.year || date.getFullYear(),
						"month": date.month ||  date.getMonth() + 1,
						"day": date.day || date.getDate(),
						"hour": date.hour || date.getHours(),
						"minute": date.minutes || date.getMinutes()
					});
				}
				this.hideDateTimePicker();
			},
			confirmSelection() {
				this.$emit("input", this.selectedDate);
				this.hideDateTimePicker();
			}
		},
		"mounted": function () {

			if (this.value && !this.selectedDate) {
				let date = new Date(this.value);
				this.selectedDate = DateTime.fromObject({
					"year": date.year || date.getFullYear(),
					"month": date.month ||  date.getMonth() + 1,
					"day": date.day || date.getDate(),
					"hour": date.hour || date.getHours(),
					"minute": date.minutes || date.getMinutes()
				});
			}
		},
		"watch": {
			"minDateObject": function () {
				if (this.selectedDate < this.minDateObject) {
					this.selectedDate = "";
					this.cachedValue = "";
				}
			}
		}
	};
}());
</script>
<style scoped lang="scss" rel="stylesheet/scss">

	@import "../../scss/variables.scss";

	svg:not(:root).svg-inline--fa {
		overflow: visible;
	}
	.svg-inline--fa {
		display: inline-block;
		font-size: inherit;
		height: 1em;
		overflow: visible;
		vertical-align: -0.125em;
	}
	.svg-inline--fa.fa-w-8 {
		width: 0.5em;
	}

	.date-time-picker-wrapper {
		position: relative;
		min-width: 315px;
		max-width: 100%;
		.control {
			.input {
				cursor: pointer;
			}
		}

		.date-time-picker-input-wrapper {
			display: flex;
			align-items: center;
			position: relative;
			min-height: 36px;
			box-sizing: border-box;
			background-color: #fff;

			.date-time-picker-input {
				flex: 1;
				font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
				font-size: 16px;
				padding-right: 25px;
				padding-left: 30px;
				height: 36px;
				border: 1px solid #dbdbdb;
				color: $gray-font-color;
				box-shadow: inset 0 1px 2px rgba(10,10,10,.1);
				max-width: 100%;
				width: 100%;
				border-radius: 4px;
				z-index: 999;
				background: transparent;
				cursor: pointer;
				font-weight: 400;
			}

			.date-time-picker-input-icon {
				position: absolute;
				color: #dbdbdb;
				width: 36px;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;

				svg {
					position: relative;
					bottom: 2px;
				}

				&.is-left {
					left: 0;
				}
				&.is-right {
					right: 0;
				}

			}
		}

		.date-time-picker-popup {
			position: absolute;
			right: 3px;
			z-index: 9999;
			background-color: white;
			min-width: 300px;
			border-radius: 7px;
			box-shadow: 0px 1px 7px -2px $primary-color;
			user-select: none;
		}
	}
</style>
