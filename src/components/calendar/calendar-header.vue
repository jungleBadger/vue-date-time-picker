<template>
	<header class="calendar-header">
		<nav class="calendar-header-nav">
			<button @click.stop="backOneMonth" class="button is-small is-rounded">
				<span class="icon">
					<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-chevron-left fa-w-10"><path data-v-2bd0f78f="" fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" class=""></path></svg>
				</span>
			</button>
			<h3 class="calendar-header-title">
				{{selectedMonthName}}
				{{selectedYear}}
			</h3>
			<button @click.stop="advanceOneMonth" class="button is-small is-rounded">
				<span class="icon">
					<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-chevron-right fa-w-10"><path data-v-2bd0f78f="" fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>
				</span>
			</button>
		</nav>
		<section class="calendar-header-days-wrapper">
			<h6
				v-for="(dayLabel, dayValue) in days"
				:title="dayLabel"
				:key="dayValue"
				v-once>
					{{expanded ? dayLabel : dayLabel[0]}}
			</h6>
		</section>

	</header>
</template>
<script type="text/javascript">
(function () {
	"use strict";

	const Info = require("luxon").Info;

	module.exports = {
		"name": "CalendarHeader",
		"components": {
		},
		"mixins": [
		],
		"props": {
			"selectedMonth": {
				"type": Number,
				"required": true
			},
			"selectedYear": {
				"type": Number,
				"required": true
			}
		},
		"data": function() {
			return {
				"days": {},
				"months": {}
			}
		},
		"computed": {
			"selectedMonthName": function () {
				return this.months[this.selectedMonth];
			}
		},
		"methods": {
			"backOneMonth": function () {
				let newMonth = this.selectedMonth - 1;
				this.$emit("updateMonth", {
					"month": newMonth < 0 ? 11 : newMonth,
					"year": newMonth < 0 ? this.selectedYear - 1 : this.selectedYear
				});
			},
			"advanceOneMonth": function () {
				let newMonth = this.selectedMonth + 1;
				this.$emit("updateMonth", {
					"month": newMonth > 11 ? 0 : newMonth,
					"year": newMonth > 11 ? this.selectedYear + 1 : this.selectedYear
				});
			}
		},
		"beforeMount": function () {
			Info.weekdays().forEach((day, index) => {
				this.days[index] = day.charAt(0).toUpperCase() + day.slice(1);
			});

			Info.months().forEach((month, index) => {
				this.months[index] = month.charAt(0).toUpperCase() + month.slice(1);
			});
		}
	};
}());
</script>
<style scoped lang="scss" rel="stylesheet/scss">

	@import "../../scss/variables.scss";

	.calendar-header {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		background-color: $primary-color;
		color: white;
		box-shadow: 0px 4px 20px 3px gainsboro;
		font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;

		.calendar-header-nav {
			width: 100%;
			height: 42px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 11px;

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

			.calendar-header-title {
				flex: 1;
				text-align: center;
				font-size: 18px;
			}

			.button {
				color: white;
				background-color: transparent;
				border: 0;
				font-size: 14px;
				cursor: pointer;
			}
		}

		.calendar-header-days-wrapper {
			display: grid;
			width: 100%;
			max-width: 100%;
			grid-template-columns: repeat(7, minmax(0, 1fr));
			grid-gap: 0;
			margin-bottom: 4px;
			h6 {
				width: 100%;
				height: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				display: block;
				text-align: center;
				margin: 7px 0;
				font-size: 16px;
			}
		}

	}

</style>
