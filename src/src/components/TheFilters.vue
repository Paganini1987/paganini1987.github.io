<template>
    <ul class="is-flex is-align-items-center is-flex-wrap-wrap">
        <li class="mb-2">
            <sort-by title="Сортировать по:" />
        </li>
        <li class="mb-2">
            <filter-by
                v-model="currentTerritory"
                :list="territory"
                title="Территория"
            />
        </li>
        <li class="mb-2">
            <filter-by-range
                v-model="currentEmpoyees"
                :range="employeesRange"
                title="Сотрудники до"
            />
        </li>
    </ul>
</template>

<script>
import { mapGetters } from 'vuex'
import FilterBy from './FilterBy.vue'
import FilterByRange from './FilterByRange.vue'
import SortBy from './SortBy.vue'
export default {
    components: { SortBy, FilterBy, FilterByRange },
    name: 'TheFilters',
    computed: {
        ...mapGetters({
            territory: 'GET_FILTERS_TERRITORY',
            employeesRange: 'GET_EMPLOYEES_RANGE',
        }),
        currentTerritory: {
            get() {
                return this.$store.getters['GET_CURRENT_TERRITORY']
            },
            set(value) {
                this.$store.dispatch('UPDATE_CURRENT_TERRITORY', value)
            },
        },
        currentEmpoyees: {
            get() {
                return this.$store.getters['GET_CURRENT_EMPLOYEES']
            },
            set(value) {
                this.$store.dispatch('UPDATE_CURRENT_EMPLOYEES', value)
            },
        },
    },
}
</script>
<style lang="css" scoped>
li {
    max-width: 100%;
}
li:not(:last-of-type) {
    margin-right: 10px;
}
</style>
