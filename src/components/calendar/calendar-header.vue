<template>
	<header class="calendar-header" :class="{'__is-expanded': isExpanded}">
		<nav class="calendar-header-nav">
			<template v-if="isExpanded">
				<div class="calendar-header-nav-configs">
					<button @click.stop="backOneYear" class="nav-button" aria-label="Click to go back one year">
						<span class="calendar-header-nav-icon">
							<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-chevron-left fa-w-10"><path data-v-2bd0f78f="" fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" class=""></path></svg>
						</span>
					</button>
					<span :title="selectedYear">
							{{selectedYear}}
						</span>
					<button @click.stop="advanceOneYear" class="nav-button" aria-label="Click to advance one year">
						<span class="calendar-header-nav-icon">
							<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-chevron-right fa-w-10"><path data-v-2bd0f78f="" fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>
						</span>
					</button>
					<div class="calendar-header-nav-configs-close">
						<button @click.stop="togglePeriodSelection" class="button is-small has-icons-left" aria-label="Close configs">
							<span class="calendar-header-nav-icon icon" >
								<svg aria-hidden="true" style="transform: rotate(90deg);" focusable="false" data-prefix="fas" data-icon="chevron-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-chevron-left fa-w-10"><path data-v-2bd0f78f="" fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" class=""></path></svg>
							</span>
						</button>
					</div>
				</div>
			</template>
			<template v-else>
				<button @click.stop="backOneMonth" class="nav-button" aria-label="Click to go back one month">
					<span class="calendar-header-nav-icon">
						<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-chevron-left fa-w-10"><path data-v-2bd0f78f="" fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" class=""></path></svg>
					</span>
				</button>
				<button class="calendar-header-title" @click="togglePeriodSelection" aria-label="Click to change year and month configs">
					<span :title="`${selectedMonthName}/${selectedYear}`">
						{{selectedYear}}/{{selectedMonthName}}
					</span>
				</button>
				<button @click.stop="advanceOneMonth" class="nav-button" aria-label="Click to advance one month">
					<span class="calendar-header-nav-icon">
						<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-chevron-right fa-w-10"><path data-v-2bd0f78f="" fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>
					</span>
				</button>
			</template>

		</nav>
		<section class="calendar-header-configs-wrapper" v-if="isExpanded">
			<button
				v-for="(month, index) in months"
				:key="month"
				@click="selectMonth(index)"
				:class="{'__is-selected': month === months[selectedMonth]}"
				class="selectable-option">
				{{month}}
			</button>
		</section>
		<section class="calendar-header-days-wrapper">
			<h6
				v-for="(dayLabel, dayValue) in days"
				:title="dayValue + dayLabel"
				:key="dayValue">{{dayLabel}}</h6>
		</section>

	</header>
</template>
<script type="text/javascript">
(function () {
	"use strict";

	module.exports = {
		"name": "CalendarHeader",
		"props": {
			"selectedMonth": {
				"type": Number,
				"required": true
			},
			"selectedYear": {
				"type": Number,
				"required": true
			},
			"days": {
				"type": Object,
				"required": true
			},
			"months": {
				"type": Object,
				"required": true
			}
		},
		"data": function () {
			return {
				"isExpanded": false
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
			},
			"backOneYear": function () {
				this.$emit("updateMonth", {
					"month": this.selectedMonth,
					"year": this.selectedYear - 1
				});
			},
			"advanceOneYear": function () {
				this.$emit("updateMonth", {
					"month": this.selectedMonth,
					"year": this.selectedYear + 1
				});
			},
			"selectMonth": function (selectedMonth) {
				this.$emit("updateMonth", {
					"month": Number(selectedMonth),
					"year": this.selectedYear
				});
			},
			"togglePeriodSelection": function () {
				this.isExpanded = !this.isExpanded;
			}
		}
	};
}());
</script>
<style scoped lang="scss" rel="stylesheet/scss">

	@import "../../scss/variables.scss";

	.calendar-header {
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #fff9f9;
		color: #363636;
		box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
		font-family: $font-stack;
		z-index: 3;

		&.__is-expanded {
			width: 100%;
			height: 100%;
			z-index: 9999;
		}

		.calendar-header-nav {
			width: 100%;
			height: 36px;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.calendar-header-nav-configs {
				width: 100%;
				display: flex;
				align-items: center;
				.calendar-header-nav-configs-close {
					display: flex;
					justify-content: flex-end;
					flex: 1;
					padding: 6px;

					.button {
						box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
						font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
						font-weight: 400;
						border: 1px solid #dbdbdb;
						border-radius: 4px;
					}
				}
			}

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
				font-size: 16px;
				margin: 0;
				border: 0;
				background-color: transparent;
				text-transform: capitalize;
				cursor: pointer;
			}

			.nav-button {
				color: #363636;
				background-color: transparent;
				border: 0;
				font-size: 14px;
				cursor: pointer;
				width: 42px;
				height: 36px;
			}
		}

		.calendar-header-configs-wrapper {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			grid-template-rows: 36px 36px 36px 36px;
			flex: 1;
			grid-row-gap: 6px;
			grid-column-gap: 6px;
			padding: 6px;



			.selectable-option {
				letter-spacing: 1px;
				height: 100%;
				display: flex;
				font-size: 16px;
				align-items: center;
				justify-content: center;
				cursor: pointer;
				box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
				border: 0;
				border-radius: 3px;
				background-color: white;
				font-family: $font-stack;
				text-transform: capitalize;
				color: #363636;
				transition: background-color 0.1s linear;
				span {
					overflow: hidden;
					text-overflow: ellipsis;
					max-width: 100%;
				}
				&:hover {
					background-color: #f5f5f5;
				}
				&.__is-selected {
					background-color: #4c84c7;
					color: white;
					text-align: center;
					border-radius: 3px;
					-webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);
					box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);
				}
			}
		}

		.calendar-header-days-wrapper {
			display: grid;
			width: 100%;
			max-width: 100%;
			grid-template-columns: repeat(7, minmax(0, 1fr));
			grid-gap: 0;
			height: 28px;

			h6 {
				width: 100%;
				height: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				text-align: center;
				margin: 0;
				font-size: 14px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}

</style>
