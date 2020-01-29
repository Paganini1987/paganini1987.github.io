<template>
	<div>
		<filters is-additional></filters>
		<showcase is-additional></showcase>
		<showcase-cart></showcase-cart>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios'
import Filters from './Filters.vue'
import Showcase from './Showcase.vue'
import ShowcaseCart from './ShowcaseCart.vue'
import mixins from '../mixins/index'

export default {
	name: 'Additional',
	components: { Filters, Showcase, ShowcaseCart },
	data () {
		return {
			
		}
	},
	mixins: [mixins],
	computed: {
		...mapGetters({
			currentCategory: 'GET_CURRENT_CATEGORY',
			categoriesList: 'GET_CATEGORIES_LIST'
		})
	},
	methods: {
		
	},
	created () {
		Promise.all([
			this.$store.dispatch('GET_DISHES_LIST'),
			this.$store.dispatch('GET_CATEGORIES_LIST')
		])
			.then(()=>{
				this.checkHash()
			})
	}
}
</script>

<style>

</style>