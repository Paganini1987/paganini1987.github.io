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

export default {
	name: 'Additional',
	components: { Filters, Showcase, ShowcaseCart },
	data () {
		return {
			
		}
	},
	computed: {
		...mapGetters({
			
		})
	},
	methods: {
		
	},
	created () {
		this.$store.dispatch('SET_IS_MAIN_MENU', false)
	}
}
</script>

<style>

</style>