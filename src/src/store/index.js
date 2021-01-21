import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import store from './index'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data: [],
        sortBy: 'employees',
        filterBy: {},
        territory: [],
        employeesRange: {
            min: 0,
            max: 0,
        },
        currentTerritory: 'all',
        currentEmployees: 0,
        loading: false,
    },
    mutations: {
        SET_DATA(state, data) {
            state.data = data
        },
        SET_LOADING_STATUS(state, data) {
            state.loading = data
        },
        SET_SORT_BY(state, data) {
            state.sortBy = data
        },
        SET_FILTERS_DATA(state, { data, key }) {
            state[key] = data
        },
        SET_CURRENT_TERRITORY(state, data) {
            state.currentTerritory = data
        },
        SET_EMPLOYEES_RANGE(state, { min, max }) {
            state.employeesRange.min = min
            state.employeesRange.max = max
        },
        SET_CURRENT_EMPLOYEES(state, data) {
            state.currentEmployees = +data
        },
    },
    actions: {
        async LOAD_DATA({ commit }) {
            commit('SET_LOADING_STATUS', true)
            try {
                const response = await axios.get('/data.json')
                commit('SET_DATA', response.data)
                store.dispatch('UPDATE_FILTERS_DATA', {
                    data: response.data,
                    key: 'territory',
                })
                store.dispatch('UPDATE_EMPLOYEES_RANGE', response.data)
            } catch (err) {
                alert(err)
            }
            commit('SET_LOADING_STATUS', false)
        },
        UPDATE_SORT_BY({ commit }, data) {
            commit('SET_SORT_BY', data)
        },
        UPDATE_FILTERS_DATA({ commit }, { data, key }) {
            let arr = data.map(lib => lib[key])

            arr = arr.filter((item, i) => arr.indexOf(item) === i)

            commit('SET_FILTERS_DATA', { data: arr, key })
        },
        UPDATE_EMPLOYEES_RANGE({ commit }, data) {
            let arr = data.map(lib => lib.employees)
            let min = arr[0]
            let max = arr[0]

            arr.forEach(item => {
                if (item < min) {
                    min = item
                }
                if (item > max) {
                    max = item
                }
            })

            commit('SET_EMPLOYEES_RANGE', { min, max })
            commit('SET_CURRENT_EMPLOYEES', max)
        },
        UPDATE_CURRENT_TERRITORY({ commit }, data) {
            commit('SET_CURRENT_TERRITORY', data)
        },
        UPDATE_CURRENT_EMPLOYEES({ commit }, data) {
            commit('SET_CURRENT_EMPLOYEES', data)
        },
    },
    getters: {
        GET_DATA: state => state.data,
        GET_LOADING_STATUS: state => state.loading,
        GET_SORT_BY: state => state.sortBy,
        GET_FILTERS_TERRITORY: state =>
            state.territory.sort((a, b) => {
                if (a.toLowerCase() < b.toLowerCase()) return -1
                if (a.toLowerCase() > b.toLowerCase()) return 1
                return 0
            }) || [],
        GET_CURRENT_TERRITORY: state => state.currentTerritory,
        GET_EMPLOYEES_RANGE: state => state.employeesRange,
        GET_CURRENT_EMPLOYEES: state => state.currentEmployees,
    },
})
