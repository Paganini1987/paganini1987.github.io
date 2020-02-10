<template>
	<section class="filters" v-fix>
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="filters__inner">
						<ul class="filters__list" :class="{ notIsSet: !currentCategory.isSet && isAdditional }">
							<li class="filters__item" v-for="(item, index) in sortedCategories" :key="index">
								<a :href="'#' + item.name" class="filters__link" @click.prevent="setCategory(item)" :class="{ active: item === proxyCurrentCategory }">{{ item.name }}</a>
							</li>
						</ul>
						<div v-if="currentCategory.isSet || !isAdditional" class="filters__group">

							<drop-down is-large attribute="dishes" label="Ваше меню" :list="sortedCategories" :current-value="proxyCurrentCategory" @change-value="setCategory"></drop-down>
							
							<drop-down is-small label="Блюд" :list="dishesList" :current-value="proxyDishes" @change-value="setDishes"></drop-down>
							
							<drop-down is-small label="Персон" :list="personsList" :current-value="proxyPersons" @change-value="setPersons"></drop-down>

						</div>
						<button v-if="!isAdditional" class="filters__button filters__button--main filters__button--fixed-on-mobile df-btn df-btn--ca" :disabled="+proxyDishes !== selectedDishesCount">
							{{ buttonText }}
						</button>

						<!-- !!!На мобилке эта кнопка располагается в компоненте ShowcaseCart -->
						<button v-if="isAdditional && currentCategory.isSet" class="filters__button filters__button--add filters__button--hidden-on-mobile df-btn df-btn--large df-btn--bordered df-btn--blue">
							Добавить к заказу
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { mapGetters } from 'vuex';
import DropDown from './Common/Dropdown.vue'

export default {
	name: 'Filters',
	components: { DropDown },
	props: {
		isAdditional: {
			type: Boolean
		}
	},
	data () {
		return {
			
		}
	},
	directives: {
		fix: {
			inserted (el) {
				//Fix filters line
				var filters = {
					isInit: false,
					$line: null,
					lineHeight: 0,
					lineOffsetTop: 0,
					init: function () {
						if (!this.isInit) {
							this.$line = $(el)
							this.lineHeight = this.$line.outerHeight()
							this.lineOffsetTop = this.$line.offset().top

							$(window).on('scroll', this.handler.bind(this))
							this.isInit = true

							let mutationObserver = new MutationObserver(function() {
								this.lineHeight = this.$line.outerHeight()
								this.lineOffsetTop = this.$line.offset().top
								this.handler()
							}.bind(this));

							mutationObserver.observe(document.documentElement, {
								attributes: true,
								characterData: true,
								childList: true,
								subtree: true,
								attributeOldValue: true,
								characterDataOldValue: true
							});
						}
					},
					destroy: function () {
						if (this.isInit) {
							this.handler()
							$(window).off('scroll', this.handler)
							this.isInit = false
						}
					},
					handler: function () {
						if (this.lineOffsetTop <= $(window).scrollTop() && this.isInit) {
							this.$line.addClass('fixed')
							$('body').css('margin-top', this.lineHeight + 'px')
						} else {
							this.$line.removeClass('fixed')
							$('body').css('margin-top', 0 + 'px')
						}
					}
				}

				if (window.innerWidth > 1200) {
					filters.init();
				}

				$(window).on('resize', function() {
					if (window.innerWidth > 1200) {
						filters.init();
					} else {
						filters.destroy();
					}
				})
			}
		}
	},
	computed: {
		...mapGetters({
			categories: 'GET_CATEGORIES',
			currentCategory: 'GET_CURRENT_CATEGORY',
			setParams: 'GET_SET_PARAMS',
			persons: 'GET_PERSONS_COUNT',
			dishes: 'GET_DISHES_COUNT',
			selectedDishes: 'GET_SELECTED_DISHES'
		}),
		sortedCategories () {
			return this.categories.sort((a,b)=>(+a) - (+b))
		},
		proxyCurrentCategory: {
			get () {
				return this.currentCategory
			},
			set (value) {
				this.$store.dispatch('SET_CURRENT_CATEGORY', value)
			}
		},
		proxyPersons: {
			get () {
				return this.persons
			},
			set (value) {
				this.$store.dispatch('SET_PERSONS_COUNT', value)
			}
		},
		proxyDishes: {
			get () {
				return this.dishes
			},
			set (value) {
				this.$store.dispatch('SET_DISHES_COUNT', value)
			}
		},
		dishesList () {
			return this.setParams.map(param=>param.count_din).filter((param, i, arr)=>arr.indexOf(param) === i).sort()
		},
		personsList () {
			return this.setParams.map(param=>param.count_pers).filter((param, i, arr)=>arr.indexOf(param) === i).sort()
		},
		defaultDishesPersons () {
			return this.setParams.filter(param=>param.default === 'Y').length ? this.setParams.filter(param=>param.default === 'Y')[0] : this.setParams[0]
		},
		setPrice () {
			return this.setParams.filter(param=>param.count_din === this.proxyDishes && param.count_pers === this.proxyPersons).length ? this.setParams.filter(param=>param.count_din === this.proxyDishes && param.count_pers === this.proxyPersons)[0].price : 0
		},
		selectedDishesCount () {
			return this.selectedDishes.length
		},
		buttonText () {
			if (+this.proxyDishes === this.selectedDishesCount) {
				return `Заказать ${ this.selectedDishesCount } ${ this.words } за ${ this.priceFormat(this.setPrice) } ₽`
			}
			if (+this.proxyDishes > this.selectedDishesCount) {
				return `Выбрано ${ this.selectedDishesCount } блюд из ${ this.proxyDishes }`
			}
			if (+this.proxyDishes < this.selectedDishesCount) {
				return `Выбрано ${ this.selectedDishesCount } блюд из ${ this.proxyDishes }`
			}
		},
		words: function() {
			let number = this.selectedDishesCount;
			let cases = [2, 0, 1, 1, 1, 2];
			let titles = ['ужин', 'ужина', 'ужинов']

			return titles[(number%100>4 && number%100<20) ? 2 : cases[(number%10<5)?number%10:5]]; 
		}
	},
	methods: {
		setCategory (cat) {
			this.proxyCurrentCategory = cat
		},
		setDishes (val) {
			this.proxyDishes = val
		},
		setPersons (val) {
			this.proxyPersons = val
		},
		priceFormat (value) {
			return value.toString().replace(/\D/g, '').replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/g, ' ')
		}
	},
	watch: {
		defaultDishesPersons () {
			this.proxyPersons = this.defaultDishesPersons.count_pers
			this.proxyDishes = this.defaultDishesPersons.count_din
		}
	}
}
</script>

<style>

</style>