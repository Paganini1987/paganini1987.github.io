import Vue from 'vue'
import Personal from './VueComponents/Account/Personal/Personal.vue'
import store from './store/index'

new Vue({
	el: '#app',
	store,
	render: h => h(Personal)
})