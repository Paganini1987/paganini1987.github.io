<template>
	<a href="javascript:void(0);" class="dish">
		<ul class="dish__labels">
			<li class="dish__label" v-for="(label, key) in labels" :key="key">{{ label }}</li>
		</ul>
		<div class="dish__img">
			<img :src="inputData.preview_img" :alt="inputData.name">
		</div>
		<div class="dish__description">
			{{ inputData.name }}
		</div>
		<div class="dish__footer" :class="{ 'dish__footer--set': !isSet }">
			
			<div class="dish__info">
				<svg class="dish__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="12" cy="12" r="8" stroke="#7C8289" stroke-width="1.5"/>
					<path d="M11 7.5C11 7.22386 11.2239 7 11.5 7H12C12.2761 7 12.5 7.22386 12.5 7.5V12.5C12.5 12.7761 12.2761 13 12 13H11.5C11.2239 13 11 12.7761 11 12.5V7.5Z" fill="#7C8289"/>
					<path d="M15.5 12C15.7761 12 16 12.2239 16 12.5L16 13C16 13.2761 15.7761 13.5 15.5 13.5L11.5 13.5C11.2239 13.5 11 13.2761 11 13L11 12.5C11 12.2239 11.2239 12 11.5 12L15.5 12Z" fill="#7C8289"/>
				</svg>
				<span class="dish__value">{{ properties.cook_time }} м.</span>										
			</div>
			<div class="dish__info">
				<svg class="dish__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M0 0H24V24H0V0Z" fill="white"/>
					<ellipse cx="12" cy="11.5" rx="10" ry="6" stroke="#7C8289" stroke-width="1.5"/>
					<path d="M19 15.5C18.5 17.5 15.3827 19.5 12 19.5C8.61726 19.5 5.5 17.5 5 15.5" stroke="#7C8289" stroke-width="1.5"/>
					<path d="M18.1157 12.6439C17.8759 14.2608 16.3971 14.996 13.7172 14.9836C10.2942 14.9679 8.8148 12.9169 9.05461 11.3C9.29442 9.68304 11.5172 8.67309 14.0194 9.04419C16.5215 9.41529 18.3555 11.0269 18.1157 12.6439Z" stroke="#7C8289" stroke-width="1.5"/>
					<path d="M9.01073 10.7784C7.09311 10.5351 5.42761 11.2123 5.29072 12.291C5.15384 13.3698 6.59741 14.4415 8.51502 14.6848C9.3956 14.7966 10.223 14.7142 10.8737 14.488" stroke="#7C8289" stroke-width="1.5" stroke-linecap="round"/>
				</svg>											
				<span class="dish__value">{{ properties.weight }} гр.</span>										
			</div>

			<template v-if="isSet">
				<div class="dish__switch df-switch df-switch--small" @click.stop="toggleSelect" :class="{ selected: isSelected }">
					<div class="df-switch__holder">
						<div class="df-switch__selected">
							<span>Выбрано</span>
							<div class="df-switch__circle df-switch__circle--selected">													
							</div>
						</div>
						<div class="df-switch__select">
							<div class="df-switch__circle df-switch__circle--select">													
							</div>
							<span>Выбрать</span>
						</div>
					</div>
				</div>
			</template>
			
			<div v-else class="dish__footer-bottom">
				<div v-if="inputData.old_price" class="dish__old-price">
					{{ inputData.old_price }} ₽
				</div>
				<div class="dish__price">
					{{ inputData.price }} ₽
				</div>
				<div class="dish__p">
					/ {{ inputData.measure_unit }}
				</div>

				<div class="dish__add df-add" :class="{ isOpened: count > 0 }">
					<div class="df-add__label">Персон</div>
					<div class="df-add__holder">
						<div class="df-add__minus" @click.stop="remove">
							<svg width="18" height="4" viewBox="0 0 18 4" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M0.5 3.5C0.223858 3.5 9.94934e-08 3.27614 8.74228e-08 3L0 1C-1.20706e-08 0.723858 0.223858 0.500001 0.5 0.500001L17.5 0.5C17.7761 0.5 18 0.723858 18 1V3C18 3.27614 17.7761 3.5 17.5 3.5L0.5 3.5Z"/>
							</svg>
						</div>
						<div class="df-add__counter">{{ count }}</div>
					</div>
					<div class="df-add__wrapper" :class="{ max: steps === 0 }">
						<div class="df-add__tooltip df-add__tooltip--right df-tooltip" v-tooltip>
							Вы&nbsp;выбрали максимальное количество блюд для заказа
							<div class="df-tooltip__arrow"></div>
						</div>
						<div class="df-add__plus" @click.stop="add" :class="{ 'df-add__plus--disabled': steps === 0 }">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M9 0C8.72386 0 8.5 0.223857 8.5 0.5V8C8.5 8.27614 8.27614 8.5 8 8.5H0.5C0.223858 8.5 0 8.72386 0 9V11C0 11.2761 0.223857 11.5 0.5 11.5H8C8.27614 11.5 8.5 11.7239 8.5 12V19.5C8.5 19.7761 8.72386 20 9 20H11C11.2761 20 11.5 19.7761 11.5 19.5V12C11.5 11.7239 11.7239 11.5 12 11.5H19.5C19.7761 11.5 20 11.2761 20 11V9C20 8.72386 19.7761 8.5 19.5 8.5H12C11.7239 8.5 11.5 8.27614 11.5 8V0.5C11.5 0.223858 11.2761 0 11 0H9Z"/>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</div>
	</a>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'ShowcaseDish',
	props: {
		inputData: {
			required: true
		}
	},
	data () {
		return {
			count: 0,
			steps: 2
		}
	},
	directives: {
		tooltip: {
			inserted (el) {
				let tooltipRightBorder = el.getBoundingClientRect().left + el.clientWidth;
				
				function handler () {
					if (tooltipRightBorder >= window.innerWidth - 50) {
						el.classList.remove('df-add__tooltip--right')
						el.classList.add('df-add__tooltip--left')
					} else {
						el.classList.remove('df-add__tooltip--left')
						el.classList.add('df-add__tooltip--right')
					}
				}
				
				handler()
				
				window.addEventListener('resize', handler)
			}
		}
	},
	computed: {
		...mapGetters({
			currentCategory:  'GET_CURRENT_CATEGORY',
			selectedSetDishes: 'GET_SELECTED_DISHES',
			setIsFull: 'GET_SET_STATE'
		}),
		properties () {
			return this.inputData.properties ? this.inputData.properties : {}
		},
		labels () {
			return this.properties.text_badge ? this.properties.text_badge : {}
		},
		ratio () {
			return this.inputData.ratio ? +this.inputData.ratio : 2
		},
		isSet () {
			return this.currentCategory.is_set
		},
		isSelected () {
			return this.selectedSetDishes.indexOf(this.inputData.id) >= 0
		}
	},
	methods: {
		add () {
			if (this.steps > 0) {
				this.steps--
				this.count += this.ratio
			}
		},
		remove () {
			if (this.steps < 2) {
				this.steps++
				this.count -= this.ratio
			} 
		},
		toggleSelect () {
			if (!this.isSelected) {
				this.$store.dispatch('ADD_DISH_TO_SET', this.inputData.id)
			} else {
				this.$store.dispatch('REMOVE_DISH_FROM_SET', this.inputData.id)
			}
		}
	}
}
</script>

<style>

</style>