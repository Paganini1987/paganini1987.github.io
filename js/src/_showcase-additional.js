import Vue from 'vue'
import Additional from './VueComponents/Additional.vue'
import store from './store'

new Vue({
	el: '#app',
	store,
	render: h => h(Additional)
})