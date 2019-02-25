<template>
	<div class="time-picker">
		<div class="time-picker-times">
			<div class="field __is_hour">
				<select class="select" v-model="_hour" @change="timeSelected">
					<option v-for="(hour, index) in hours" :key="hour" :value="index" v-once>
						{{index >= 10 ? index : `0${index}`}} h
					</option>
				</select>
			</div>
			<span class="hour-separator">
				<span class="icon">:</span>
			</span>
			<div class="field __is_minute">
				<select class="select" v-model="_minute" @change="timeSelected">
					<option v-for="(minute, index) in minutes" :key="minute" :value="index" v-once>
						{{index >= 10 ? index : `0${index}`}} m
					</option>
				</select>
			</div>
		</div>
		<div class="time-picker-confirm">
			<button class="button is-small" @click.stop="cancelSelection">Cancel</button>
			<button class="button is-success is-small" @click.stop="confirmSelection">Confirm</button>
		</div>
	</div>
</template>
<script type="text/javascript">
(function () {
	"use strict";
	module.exports = {
		"name": "TimePicker",
		"components": {
		},
		"props": {
			"selectedHour": {
				"type": Number,
				"required": true
			},
			"selectedMinute": {
				"type": Number,
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
		"computed": {
		},
		"methods": {
			timeSelected() {
				this.$emit("timeSelected", {
					"hour": this._hour,
					"minute": this._minute
				})
			},
			cancelSelection() {
				this.$emit("cancelSelection");
			},
			confirmSelection() {
				this.$emit("confirmSelection");
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

	.time-picker {
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding: 7px;
		background: whitesmoke;
		height: 50px;
		box-shadow: 0 -2px 4px -1px gainsboro;
		font-family: $font-stack;

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
						font-size: 16px;
						background-color: white;
						height: 36px;
						border: 1px solid  #dbdbdb;
						color: #363636;
						box-shadow: inset 0 1px 2px rgba(10,10,10,.1);
						max-width: 100%;
						width: 100%;
						border-radius: 4px;
						z-index: 999;
						cursor: pointer;
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
					width: 21px;
				}

			}

			&.time-picker-confirm {
				display: flex;
				align-items: center;
				justify-content: center;
				.button {
					margin: 0 3px;
					height: 36px;
					border: 1px solid  #dbdbdb;
					box-shadow: inset 0 1px 2px rgba(10,10,10,.1);
					max-width: 100%;
					width: 100%;
					border-radius: 4px;
					cursor: pointer;
					background-color: white;
					color: $gray-font-color;

					&.is-success {
						background: $success-color;
						color: white;
						font-weight: bold;
					}
				}
			}

		}


	}


</style>
