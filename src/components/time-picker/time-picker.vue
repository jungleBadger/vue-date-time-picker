<template>
	<div class="time-picker">
		<div class="time-picker-times" v-if="showTimePicker">
			<div class="field __is_hour">
				<div class="select">
					<select  v-model="_hour" @change="timeSelected">
						<option v-for="(hour, index) in hours" :key="hour" :value="index" v-once>
							{{index >= 10 ? index : `0${index}`}} H
						</option>
					</select>
				</div>
			</div>
			<span class="hour-separator">
				<span class="icon">:</span>
			</span>
			<div class="field __is_minute">
				<div class="select">
					<select v-model="_minute" @change="timeSelected">
						<option v-for="(minute, index) in minutes" :key="minute" :value="index" v-once>
							{{index >= 10 ? index : `0${index}`}} M
						</option>
					</select>
				</div>
			</div>
		</div>
		<div class="time-picker-confirm">
			<button class="button is-small" @click.stop="confirmSelection">Confirm</button>
		</div>
	</div>
</template>
<script type="text/javascript">
(function () {
	"use strict";
	module.exports = {
		"name": "TimePicker",
		"props": {
			"selectedHour": {
				"type": Number,
				"required": true
			},
			"selectedMinute": {
				"type": Number,
				"required": true
			},
			"showTimePicker": {
				"type": Boolean,
				"required": true
			}
		},
		"data": function() {
			return {
				"hours": 24,
				"minutes": 60,
				"_hour": 0,
				"_minute": 0
			}
		},
		"methods": {
			timeSelected() {
				this.$emit("timeSelected", {
					"hour": this._hour,
					"minute": this._minute
				});
			},
			cancelSelection() {
				this.$emit("cancelSelection");
			},
			confirmSelection() {
				this.$emit("confirmSelection", true);
			}
		},
		"beforeMount": function () {
			this._hour = this.selectedHour || 0;
			this._minute = this.selectedMinute || 0;
		}
	};
}());
</script>
<style scoped lang="scss" rel="stylesheet/scss">

	@import "../../scss/variables.scss";
	@import "../../../node_modules/bulma/sass/form/select";
	@import "../../../node_modules/bulma/sass/form/input-textarea";

	.time-picker {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		padding: 6px;
		height: 48px;
		font-family: $font-stack;
		z-index: 2;
		background-color: #fff9f9;
		box-shadow: 0px -1px 5px 0px rgba(0, 0, 0, 0.1);

		div {
			height: 100%;
			display: flex;


			&.time-picker-times {
				display: flex;
				flex: 1;
				align-items: center;

				.field {
					margin: 0;
					display: flex;
					flex-direction: column;
					height: auto;

					.select {
						font-family: $font-stack;
						font-size: 14px;
						height: 36px;
						cursor: pointer;
						select {
							height: 100%;
						}
					}

					&.__is_hour {
						text-align-last: right;
					}
					&.__is_minute {
						text-align-last: left;
					}
				}

				.hour-separator {
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 18px;
					font-weight: bold;
					width: 12px;
					color: #295c99;
				}

			}

			&.time-picker-confirm {
				display: flex;
				align-items: center;
				justify-content: center;
				.button {
					height: 36px;
					max-width: 100%;
					width: 100%;
					border-radius: 4px;
					cursor: pointer;
					box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
					font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
					font-weight: 400;
					color: #295c99;
					text-transform: uppercase;
					letter-spacing: 0;
					border: 1px solid #dbdbdb;
					&:hover {
						background-color: whitesmoke;
					}
				}
			}
		}
	}
</style>
