import Vue from 'vue'
import Orders from './VueComponents/Account/Orders/Orders.vue'
import store from './store/index'

new Vue({
	el: '#app',
	store,
	render: h => h(Orders)
})