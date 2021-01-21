import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/libs/:id',
        name: 'Detail',
        component: () =>
            import(/* webpackChunkName: "detail" */ '../views/Detail.vue'),
        beforeEnter: async (to, from, next) => {
            if (store.getters['GET_DATA'].length === 0) {
                await store.dispatch('LOAD_DATA')
            }

            if (
                store.getters['GET_DATA'].some(
                    lib => lib.kopuk === to.params.id
                )
            ) {
                next()
            } else {
                router.push('/error')
            }
        },
    },
    {
        path: '*',
        name: 'Error',
        component: () =>
            import(/* webpackChunkName: "error" */ '../views/Error.vue'),
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
