<template>
	<div>
		<filters></filters>
		<showcase></showcase>
		<showcase-more></showcase-more>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios'
import Filters from './Filters.vue'
import Showcase from './Showcase.vue'
import ShowcaseMore from './ShowcaseMore.vue'

export default {
	name: 'App',
	components: { Filters, Showcase, ShowcaseMore },
	data () {
		return {
			
		}
	},
	computed: {
		...mapGetters({
			categories: 'GET_CATEGORIES',
		})
	},
	methods: {
		
	},
	created () {
		this.$store.dispatch('SET_IS_MAIN_MENU', true)
		
		this.$store.dispatch('GET_WEEKS')
			.then(
				()=>{},
				err=>{
					console.log(err);
				}
			)
			
	}
}
</script>

<style>

</style>