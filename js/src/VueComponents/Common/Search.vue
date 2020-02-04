<template>
	<div class="df-search" :class="{ isOpened: isOpened && proxyFilteredList.length > 0 }">
		<div class="df-input">
			<input @input="showResults" v-model="input" type="text" id="search" class="df-input__input" autocomplete="off" placeholder="Введите название любимого блюда">
			<label for="search" class="df-input__label">Любимое блюдо</label>
		</div>
		<div class="df-search__dd">
			<perfect-scrollbar>
				<ul class="df-search__list">
					<li class="df-search__item" v-for="(item, index) in proxyFilteredList" :key="index" @click="select(item)">
						<div class="df-search__description">{{ item.name ? item.name : item }}</div>												
					</li>
				</ul>
			</perfect-scrollbar>
		</div>
	</div>
</template>

<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'

export default {
	name: 'Search',
	components: {
        PerfectScrollbar
    },
	props: {
		list: {
			type: Array,
			required: true
		}
	},
	data () {
		return {
			id: 0,
			isOpened: false,
			input: ''
		}
	},
	computed: {
		filteredList () {
			return this.list.filter(item => this.input !== '' && item.toLowerCase().indexOf(this.input.trim().toLowerCase()) >= 0)
		},
		proxyFilteredList () {
			return this.filteredList.filter((item, i) => i <= 5)
		}
	},
	methods: {
		showResults () {
			this.isOpened = true
		},
		select (val) {
			this.$emit('select-item', val)
		},
		handler () {
			this.isOpened = false
		}
	},
	created () {
		document.addEventListener('click', this.handler.bind(this));
		this.id = Math.round(Math.random()*1000000)
	},
	beforeDestroy () {
		document.removeEventListener('click', this.handler.bind(this));
	}
}
</script>

<style>

</style>