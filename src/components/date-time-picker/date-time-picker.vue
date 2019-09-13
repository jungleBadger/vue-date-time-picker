<template>
	<div class="date-time-picker-wrapper">
		<div class="date-time-picker-input-wrapper">
			<span class="date-time-picker-input-icon is-left">
				<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="calendar-edit" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-calendar-edit fa-w-14"><path fill="currentColor" d="M243.1 234.1l46.8 46.8c2 2 2 5.2 0 7.2L175.4 402.6l-48.2 5.4c-6.4.7-11.9-4.7-11.2-11.2l5.4-48.2 114.5-114.5c2-2 5.2-2 7.2 0zm83-10.8l-25.4-25.4c-7.9-7.9-20.7-7.9-28.6 0l-19.5 19.5c-2 2-2 5.2 0 7.2l46.8 46.8c2 2 5.2 2 7.2 0l19.5-19.5c7.9-7.9 7.9-20.7 0-28.6zM448 112v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z" class=""></path></svg>
			</span>
			<input
				class="date-time-picker-input" @focus="showDateTimePicker"
				:value="selectedDateFormatted" :placeholder="inputPlaceholder"/>
			<span class="date-time-picker-input-icon is-right">
				<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-caret-down fa-w-10"><path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" class=""></path></svg>
			</span>

		</div>
		<button class="button is-danger is-inverted date-time-picker-clear-button" :disabled="!selectedDateFormatted" :class="{'__is-disabled': !selectedDateFormatted}" @click="cleanInput">
			<span class="icon">
				<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-times fa-w-10"><path data-v-64869e31="" fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" class=""></path></svg>
			</span>
		</button>
		<aside v-show="appear" ref="popup" :id="elId" class="date-time-picker-popup">
			<calendar-base
				:minDate="minDateObject"
				:referenceDate="referenceDateObject"
				:rangedPoint="rangedPoint"
				:selectedDate="selectedDate"
				:customTimeZone="customTimeZone"
				@dateSelected="updateDate">
			</calendar-base>
			<template v-if="selectedDate">
				<time-picker
					:showTimePicker="showTimePicker"
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
		"props": {
			"elId": {
				"type": String,
				"required": false,
				"default": function () {
					return `a${Date.now()}`;
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
			},
			"customTimeZone": {
				"type": String,
				"required": false
			},
			"showTimePicker": {
				"type": Boolean,
				"required": false,
				"default": function () {
					return true;
				}
			}
		},
		"data": function() {
			return {
				"appear": false,
				"selectedDate": "",
				"cachedValue": ""
			}
		},
		"computed": {
			"inputPlaceholder": function () {
				return this.placeholder || "Insert date";
			},
			"minDateObject": function () {
				try {
					let contextDate = this.minDate && typeof this.minDate === "string" ? new Date(this.minDate) : this.minDate;
					return contextDate ? DateTime.fromObject({
						"day": contextDate.day || contextDate.getDate(),
						"month": contextDate.month || contextDate.getMonth() + 1,
						"year": contextDate.year || contextDate.getFullYear(),
						"hour": 0,
						"zone": this.customTimeZone || "local",
						"minute": 0,
						"second": 0
					}).setZone(this.customTimeZone || "local") : "";
				} catch (e) {
					return "";
				}
			},
			"referenceDateObject": function () {
				try {
					let contextDate = typeof this.referenceDate === "string" ? new Date(this.referenceDate) : this.referenceDate;
					return this.referenceDate && !isNaN(contextDate) ? DateTime.fromObject({
						"day": contextDate.day || contextDate.getDate(),
						"month": contextDate.month || contextDate.getMonth() + 1,
						"year": contextDate.year || contextDate.getFullYear(),
						"hour": 0,
						"zone": this.customTimeZone || "local",
						"minute": 0,
						"second": 0
					}) : "";
				} catch (e) {
				}
			},
			"selectedDateFormatted": function () {
				return this.selectedDate ? DateTime.fromObject({
					"year": this.selectedDate.year,
					"month": this.selectedDate.month,
					"day": this.selectedDate.day,
					"hour": this.selectedDate.hour,
					"zone": this.customTimeZone || "local",
					"minute": this.selectedDate.minute,
					"second": 0
				}).toLocaleString(DateTime.DATETIME_HUGE) : "";
			},
			"selectedHour": function () {
				return this.selectedDate ? this.selectedDate.hour : 0;
			},
			"selectedMinute": function () {
				return this.selectedDate ? this.selectedDate.minute : 0;
			}
		},
		"methods": {
			clickMonitor(ev) {
				if (!(ev.path || ev.composedPath()).find(element => {
					return element.parentElement && element.parentElement.id === this.elId;
				})) {
					if (this.minDateObject >= this.selectedDate) {
						this.cancelSelection();
					} else {
						this.confirmSelection();
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
			cleanInput() {
				if (this.rangedPoint === "start" && this.minDateObject && this.minDateObject.ts) {
					this.selectedDate = DateTime.fromMillis(this.minDateObject.ts);
					this.cachedValue = "";
					this.$emit("input", this.selectedDate);
				} else {
					this.selectedDate = "";
					this.cachedValue = "";
					this.$emit("input", "");
					this.showDateTimePicker();
				}
			},
			cancelSelection() {
				if (this.cachedValue) {
					try {
						let date = new Date(this.cachedValue);
						this.selectedDate = DateTime.fromObject({
							"year": date.year || date.getFullYear(),
							"month": date.month ||  date.getMonth() + 1,
							"day": date.day || date.getDate(),
							"hour": date.hour || date.getHours(),
							"zone": this.customTimeZone || "local",
							"minute": date.minute || date.getMinutes(),
							"second": 0
						});
					} catch (e) {
						console.log(e);
					}

				}
				this.hideDateTimePicker();
			},
			confirmSelection() {
				this.$emit("input", DateTime.fromObject({
					"year": this.selectedDate.year,
					"month": this.selectedDate.month,
					"day": this.selectedDate.day,
					"hour": this.selectedDate.hour,
					"zone": this.customTimeZone || "local",
					"minute": this.selectedDate.minute,
					"second": 0
				}));
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
					"minute": date.minute || date.getMinutes(),
					"second": 0
				}).setZone(this.customTimeZone || "local");

				if (this.customTimeZone) {
					this.$emit("input", this.selectedDate);
				}
			}
		},
		"watch": {
			"minDate": function () {
				if (this.selectedDate && this.minDateObject) {
					if (this.selectedDate.ts <= this.minDateObject.ts) {
						this.cleanInput();
						this.showDateTimePicker();
					}
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
		min-width: 320px;
		max-width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
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
			flex: 1;
			max-width: 100%;
			min-width: 80%;

			.date-time-picker-input {
				flex: 1;
				font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
				font-size: 16px;
				padding-right: 25px;
				padding-left: 30px;
				height: 36px;
				border: 1px solid #dbdbdb;
				color: $gray-font-color;
				max-width: 100%;
				width: 100%;
				border-radius: 4px;
				z-index: 999;
				background: transparent;
				cursor: pointer;
				font-weight: 400;
				box-sizing: border-box;

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
					bottom: 1px;
				}

				&.is-left {
					left: 0;
				}
				&.is-right {
					right: 0;
				}

			}
		}

		.date-time-picker-clear-button {
			cursor: pointer;
			color: $gray-font-color;
			justify-content: center;
			padding-bottom: calc(0.375em - 1px);
			padding-left: 0.75em;
			padding-right: 0.75em;
			padding-top: calc(0.375em - 1px);
			text-align: center;
			white-space: nowrap;
			align-items: center;
			border: 1px solid transparent;
			border-radius: 4px;
			display: inline-flex;
			font-size: 0.75rem;
			height: 100%;
			background-color: #ffffff;
			box-shadow: unset !important;
			margin-left: 12px;

			&:hover {
				background-color: #f2f2f2;
			}

			&.__is-disabled {
				opacity: 0.2;
				cursor: not-allowed;
				outline: none;
				background-color: #ffffff;

			}
		}

		.date-time-picker-popup {
			position: absolute;
			right: 39px;
			top: 100%;
			z-index: 9999;
			background-color: white;
			min-width: 320px;
			border-radius: 7px;
			box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, .2);
			user-select: none;
		}
	}
</style>
