import axios from './proxyAxios'
import store from './index'
import convertWeeks from '../helpers/convert-weeks'
import { lsSetData, lsGetData } from '../helpers/local-storage'

export default {
	SET_DROPDOWN_STATE ({ commit }, { id, _state }) {
		commit('SET_DROPDOWN_STATE', { id, _state })
	},
	SET_CURRENT_WEEK ({ commit }, data) {
		commit('SET_CURRENT_WEEK', data)

		lsSetData('currentWeek', data)

		// Подгрузим меню на текущую неделю
		store.dispatch('GET_WEEK_MENU')
			.then(
				()=>{},
				err=>{console.log(err);}
			)
	},
	GET_WEEKS ({ state, commit }) {
		return new Promise((resolve, reject)=>{
			axios.get(state.API.getWeeks)
				.then((response)=>{
					if (response.status === 200) {
						commit('SET_WEEKS', response.data.data.map(convertWeeks).filter(week=> week._to - new Date() > 0))

						store.dispatch('SET_CURRENT_WEEK', state.weeks[0])

						resolve()
					} else {
						throw new Error()
					}
				})
				.catch((error)=>{
					reject(error)
				})
		})
	},
	GET_WEEK_MENU ({ state, commit }) {
		return new Promise((resolve, reject)=>{
			axios.get(state.API.getWeekMenu, {params:{week: state.currentWeek.code}})
				.then((response)=>{
					if (response.status === 200) {
						commit('SET_WEEK_MENU', response.data.data)

						store.dispatch('SET_CATEGORIES', response.data.data)

						resolve()
					} else {
						throw new Error()
					}
				})
				.catch((error)=>{
					reject(error)
				})
		})
	},
	SET_CATEGORIES ({commit, state}, data) {
		if (data.menu && data.menu.length > 0) {
			commit('SET_CATEGORIES', data.menu)

			// Проверяем хэш на наличие категории
			let hash = window.location.hash;
			let cat;

			if (hash) {
				hash = decodeURI(hash).slice(1);

				cat = state.categories.filter(cat=>cat.name === hash).length > 0 ? state.categories.filter(cat=>cat.name === hash)[0] : undefined;
			}

			if (cat) {
				store.dispatch('SET_CURRENT_CATEGORY', cat)
			} else if (state.categories.filter(cat=>cat.uf_default).length > 0) {
				store.dispatch('SET_CURRENT_CATEGORY', state.categories.filter(cat=>cat.uf_default)[0])
				console.log('wrong category!');
			} else {
				store.dispatch('SET_CURRENT_CATEGORY', state.categories[0])
				console.log('wrong category!');
			}
		}
	},
	SET_CURRENT_CATEGORY ({state, commit}, data) {
		commit('SET_CURRENT_CATEGORY', data)

		// Установим хэш
		if (data.name) {
			window.location.hash = data.name
		}
	},
	SET_PERSONS_COUNT ({commit}, data) {
		commit('SET_PERSONS_COUNT', data)
	},
	SET_DISHES_COUNT ({state, commit, getters}, data) {
		commit('SET_DISHES_COUNT', data)

		//Установка выбранных по умолчанию блюд, в соответствии с приоритетом
		// Предварительно очистим выбор
		store.dispatch('CLEAR_ALL_SET')

		Object.keys(getters.GET_WEEK_MENU)
			.map(key=>getters.GET_WEEK_MENU[key])
			.sort((a,b)=>a.set_priority - b.set_priority)
			.filter((dish, i)=>i < (+state.dishes))
			.forEach(dish=>{
				store.dispatch('ADD_DISH_TO_SET', dish.id)
			})
	},
	SET_IS_MAIN_MENU ({commit}, data) {
		commit('SET_IS_MAIN_MENU', data)
	},
	ADD_DISH_TO_SET ({state, commit, getters}, data) {
		if (!state.setIsFull) {
			if (!getters.GET_SELECTED_DISHES.some(dish=>dish === data)) {
				commit('ADD_DISH_TO_SET', data)
			}
		}

		if (getters.GET_SELECTED_DISHES.length === +getters.GET_DISHES_COUNT) {
			store.dispatch('SET_SET_STATE', true)
		}
	},
	REMOVE_DISH_FROM_SET ({state, getters}, data) {
		getters.GET_SELECTED_DISHES.splice(getters.GET_SELECTED_DISHES.indexOf(data), 1)

		if (getters.GET_SELECTED_DISHES.length < +getters.GET_DISHES_COUNT) {
			store.dispatch('SET_SET_STATE', false)
		}
	},
	CLEAR_ALL_SET ({getters}) {
		getters.GET_SELECTED_DISHES.forEach((d, i)=>{
			store.dispatch('REMOVE_DISH_FROM_SET', i)
		})
	},
	SET_SET_STATE ({commit}, data) {
		commit('SET_SET_STATE', data)
	}
}