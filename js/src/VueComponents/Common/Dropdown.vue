<template>
	<div class="df-dropdown" :data-type="attribute" :class="{ 'df-dropdown--large': isLarge, 'df-dropdown--small': isSmall, 'df-dropdown--simple': isSimple, isOpened: proxyIsOpened }">
		<div class="df-dropdown__holder">
			<div class="df-dropdown__label" :class="{ 'df-dropdown__label--small': isSmall, 'df-dropdown__label--simple': isSimple, 'df-dropdown__label--white': isWhite }">{{ label }}</div>
		</div>
		<a href="#" @click.prevent.stop="proxyIsOpened = !proxyIsOpened" class="df-dropdown__head" :class="{ 'df-dropdown__head--large': isLarge, 'df-dropdown__head--white': isWhite }">
			<span v-if="proxyCurrentValue || proxyCurrentValue.name">{{ proxyCurrentValue.name ? proxyCurrentValue.name : proxyCurrentValue }}</span>
			<input v-else-if="placeholder" type="text" class="df-dropdown__input" :placeholder="placeholder">
			<svg class="df-dropdown__arrow" width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M4.81126 5.51538L0.217238 0.993803C0.0978232 0.876272 0.0978231 0.683711 0.217237 0.566181L0.582051 0.20712C0.698811 0.0922022 0.88617 0.0922021 1.00293 0.20712L5.60375 4.73538C5.8226 4.95077 6.1774 4.95077 6.39625 4.73538L10.9971 0.20712C11.1138 0.0922021 11.3012 0.0922021 11.4179 0.20712L11.7828 0.56618C11.9022 0.683711 11.9022 0.876272 11.7828 0.993803L7.18874 5.51538C6.53222 6.16154 5.46779 6.16154 4.81126 5.51538Z" fill="black"/>
			</svg>										
		</a>
		<div class="df-dropdown__dd">
			<perfect-scrollbar>
				<ul class="df-dropdown__list">
					<li class="df-dropdown__item" v-for="(item, index) in list" :key="index">
						<label>
							<input type="radio" :name="id" :value="item" v-model="proxyCurrentValue">
							<div class="df-dropdown__description">{{ item.name ? item.name : item }}</div>
							<svg class="df-dropdown__check" width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M13.1768 0.707107C13.372 0.902369 13.372 1.21895 13.1768 1.41421L5.53033 9.06066C5.23743 9.35355 4.76256 9.35355 4.46967 9.06066L0.323219 4.91421C0.127957 4.71895 0.127957 4.40237 0.323219 4.20711L0.676772 3.85355C0.872034 3.65829 1.18862 3.65829 1.38388 3.85355L5 7.46967L12.1161 0.353554C12.3114 0.158291 12.628 0.158291 12.8232 0.353553L13.1768 0.707107Z" fill="#417EDA"/>
							</svg>													
						</label>
					</li>
				</ul>
			</perfect-scrollbar>
		</div>
	</div>
</template>

<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'

export default {
	name: 'FiltersDropdown',
	components: {
        PerfectScrollbar
    },
	props: {
		isLarge: {
			type: Boolean
		},
		isSimple: {
			type: Boolean
		},
		isSmall: {
			type: Boolean
		},
		isWhite: {
			type: Boolean
		},
		label: {
			type: String,
			required: true
		},
		list: {
			type: Array,
			required: true
		},
		currentValue: {
			required: true
		},
		attribute: {
			type: String
		},
		placeholder: {
			type: String
		}
	},
	data () {
		return {
			id: 0,
			isOpened: false
		}
	},
	computed: {
		proxyCurrentValue: {
			get () {
				return this.currentValue ? this.currentValue : '0'
			},
			set (val) {
				this.$emit('change-value', val)
				this.isOpened = false
			}
		},
		proxyIsOpened: {
			get () {
				return this.isOpened
			},
			set (val) {
				this.isOpened = val
			}
		}
	},
	methods: {
		handler () {
			this.proxyIsOpened = false
		}
	},
	created () {
		document.addEventListener('click', this.handler.bind(this));
		this.id = Math.round(Math.random()*1000000)

		this.$store.dispatch('SET_DROPDOWN_STATE', { id: this.id, _state: false})
	},
	beforeDestroy () {
		document.removeEventListener('click', this.handler.bind(this));
	}
}
</script>

<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css"/>