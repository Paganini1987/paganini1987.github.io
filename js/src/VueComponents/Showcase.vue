<template>
	<section class="showcase" :class="{ 'showcase--additional': isAdditional }">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="showcase__inner">
						<transition-group name="list" tag="div" class="showcase__list">
							<div class="showcase__item" v-for="product in sortedProducts" :key="product.id" v-position>
								<showcase-dish :key="product.id" @click.native="showPopup" :input-data="product"></showcase-dish>
							</div>
						</transition-group>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { mapGetters } from 'vuex';
import ShowcaseDish from './ShowcaseDish.vue'

export default {
	name: 'Showcase',
	components: { ShowcaseDish },
	props: {
		isAdditional: {
			type: Boolean
		}
	},
	directives: {
		position: {
			inserted (el) {
				el.style.top = el.offsetTop + 'px';
				el.style.left = (el.offsetLeft - 10) + 'px';
			}
		}
	},
	computed: {
		...mapGetters({
			products:  'GET_WEEK_MENU'
		}),
		sortedProducts () {
			// TODO убрать адрес сайта у картинок, чтобы забирать их из папки upload
			return Object.keys(this.products).map(key=>this.products[key]).sort((a, b)=>a.sort - b.sort).map(product=>{

				if (!product._mod) {
					product._mod = true
					product.detail_img = 'https://uzhindoma.ru' + product.detail_img
					product.preview_img = 'https://uzhindoma.ru' + product.preview_img
				}

				return product
			})
		}

	},
	methods: {
		showPopup () {
			console.log('12');
		}
	}
}
</script>

<style>

</style>