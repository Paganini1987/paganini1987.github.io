import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import cloneDeep from 'lodash.clonedeep'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		currentCategory: {},
		dishesList: [],
		categoriesList: [],
		dishesCount: 1,
		personsCount: 1,
		currentCategoryDishesList: []
	},
	actions: {
		SET_CURRENT_CATEGORY ({commit}, data) {
			commit('SET_CURRENT_CATEGORY', data)

			// Установим количество блюд
			if (data.maxCount) {
				this.dispatch('SET_DISHES_COUNT', data.maxCount);
			} else {
				this.dispatch('SET_DISHES_COUNT', 1);
			}

			// Установим количество персон
			if (data.persons) {
				this.dispatch('SET_PERSONS_COUNT', data.persons);
			} else {
				this.dispatch('SET_PERSONS_COUNT', 1);
			}

			//Создадим список блюд данной категории
			this.dispatch('SET_CURRENT_CATEGORY_DISHES_LIST')
			
			// Установим ъэш
			if (data.url) {
				window.location.hash = data.url
			}
		},
		GET_DISHES_LIST ({commit}) {
			return axios.get('/dishes.json')
				.then(response=>{
					if (response.status === 200) {
						commit('SET_DISHES_LIST', response.data)
					} else {
						throw new Error()
					}
				})
				.catch(error=>{
					console.log(error);
				})
		},
		GET_CATEGORIES_LIST ({commit}) {
			return axios.get('/categories.json')
				.then(response=>{
					if (response.status === 200) {
						commit('SET_CATEGORIES_LIST', response.data)
					} else {
						throw new Error()
					}
				})
				.catch(error=>{
					console.log(error);
				})
		},
		SET_DISHES_COUNT ({commit}, data) {
			commit('SET_DISHES_COUNT', data)

			//Обновим список блюд данной категории
			this.dispatch('SET_CURRENT_CATEGORY_DISHES_LIST')
		},
		SET_PERSONS_COUNT ({commit}, data) {
			commit('SET_PERSONS_COUNT', data)
		},
		SET_CURRENT_CATEGORY_DISHES_LIST ({commit, state}) {
			let arr = state.dishesList.filter(dish => state.currentCategory.dishes && state.currentCategory.dishes.some(d => d.dish_id === dish.id)).map(dish => {
				let _dish = cloneDeep(dish);
				_dish._proprity = state.currentCategory.dishes.filter(d => d.dish_id === dish.id)[0].priority

				if (_dish._proprity <= state.dishesCount) {
					_dish._selected = true
				} else {
					_dish._selected = false
				}

				return _dish
			})

			commit('SET_CURRENT_CATEGORY_DISHES_LIST', arr)
		},
		TOGGLE_SELECTED_STATE_DISH ({commit, state}, id) {
			commit('SET_SELECTED_STATE_DISH', id)
		}
	},
	mutations: {
		SET_CURRENT_CATEGORY (state, data) {
			state.currentCategory = data
		},
		SET_DISHES_LIST (state, data) {
			state.dishesList = data
		},
		SET_CATEGORIES_LIST (state, data) {
			state.categoriesList = data
		},
		SET_DISHES_COUNT (state, data) {
			state.dishesCount = +data
		},
		SET_PERSONS_COUNT (state, data) {
			state.personsCount = +data
		},
		SET_CURRENT_CATEGORY_DISHES_LIST (state, data) {
			state.currentCategoryDishesList = data
		},
		SET_SELECTED_STATE_DISH (state, id) {
			state.currentCategoryDishesList.map(dish=>{

				if (dish.id === id) {
					dish._selected = !dish._selected
				}

				return dish
			})
			
		}
	},
	getters: {
		GET_CURRENT_CATEGORY (state) {
			return state.currentCategory
		},
		GET_DISHES_LIST (state) {
			return state.dishesList
		},
		GET_CATEGORIES_LIST (state) {
			return state.categoriesList
		},
		GET_CURRENT_CATEGORY_DISHES_LIST (state) {
			return state.currentCategoryDishesList
		},
		GET_PERSONS_COUNT (state) {
			return state.personsCount
		},
		GET_DISHES_COUNT (state) {
			return state.dishesCount
		}
	}
})