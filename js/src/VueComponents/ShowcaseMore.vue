<template>
	<div class="s-more">
		<div class="s-more__title">Посмотрите меню на&nbsp;другие недели</div>
		<div class="s-more__bottom">
			<div class="s-more__line s-more__line--left"></div>
			<ul class="s-more__list">
				<li class="s-more__item" v-for="(week, index) in weeks" :key="index">
					<a href="#" class="s-more__link" @click.prevent="setCurrentWeek(week)" :class="{ active: week === currentWeek }">{{ week._str }}</a>
				</li>
			</ul>
			<div class="s-more__line s-more__line--right"></div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'ShowcaseMore',
	computed: {
		...mapGetters({
			weeks: 'GET_WEEKS',
			currentWeek: 'GET_CURRENT_WEEK'
		})
	},
	methods: {
		setCurrentWeek (week) {
			this.$store.dispatch('SET_CURRENT_WEEK', week)
		}
	}
}
</script>

<style>

</style>