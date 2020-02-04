<template>
	<div class="s-cart" ref="line">
		<div class="s-cart__inner" v-pin>
			<button class="s-cart__button s-cart__button--hidden-on-desctop df-btn df-btn--large df-btn--bordered df-btn--blue">
				Добавить к заказу
			</button>
			<button class="s-cart__button df-btn df-btn--ca">Перейти в корзину 3 800 ₽ </button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ShowcaseCart',
	data () {
		return {
			
		}
	},
	directives: {
		pin: {
			inserted (el) {
				let isFixed = false;
				let footerYOffset = document.querySelector('footer').getBoundingClientRect().top + window.pageYOffset;

				let mutationObserver = new MutationObserver(function(mutations) {
					footerYOffset = document.querySelector('footer').getBoundingClientRect().top + window.pageYOffset;
					handler()
				});

				mutationObserver.observe(document.documentElement, {
					attributes: true,
					characterData: true,
					childList: true,
					subtree: true,
					attributeOldValue: true,
					characterDataOldValue: true
				});

				window.addEventListener('scroll', handler)				

				function handler () {
					let bottomScreen = window.pageYOffset + window.innerHeight;
					
					
					if (bottomScreen < footerYOffset && !isFixed) {
						el.classList.add('fixed')

						isFixed = true
					} else if (bottomScreen > footerYOffset && isFixed) {
						el.classList.remove('fixed')

						isFixed = false
					}
				}
			}
		}
	},
	methods: {
		
	},
	beforeDestroy () {

	},
	mounted () {
		
	}
}
</script>

<style>

</style>