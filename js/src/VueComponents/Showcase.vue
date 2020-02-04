<template>
	<section class="showcase" :class="{ 'showcase--additional': isAdditional }">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="showcase__inner">
						<div class="showcase__list">
							<div class="showcase__item" v-for="dish in currentCategoryDishesList" :key="dish.id">
								<showcase-dish :key="dish.id" @click.native="showPopup" :input-data="dish"></showcase-dish>
							</div>
						</div>
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
	computed: {
		...mapGetters({
			currentCategoryDishesList: 'GET_CURRENT_CATEGORY_DISHES_LIST'
		})
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