<template>
    <div class="home">
        <h1 class="title">Список библиотек</h1>
        <the-filters class="mb-5" />
        <div class="tile is-ancestor">
            <ul class="tile is-parent is-vertical">
                <li
                    class="tile is-child"
                    v-for="lib in fillteredLibs"
                    :key="lib.kopuk"
                >
                    <lib-card :inputData="lib" :key="lib.kopuk" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LibCard from '@/components/LibCard.vue'
import TheFilters from '@/components/TheFilters.vue'
export default {
    name: 'Home',
    components: { LibCard, TheFilters },
    computed: {
        ...mapGetters({
            libs: 'GET_DATA',
            sortBy: 'GET_SORT_BY',
            currentCategory: 'GET_CURRENT_TERRITORY',
            currentEmployees: 'GET_CURRENT_EMPLOYEES',
        }),
        sortedLibs() {
            return [...this.libs].sort(
                (a, b) => a[this.sortBy] - b[this.sortBy]
            )
        },
        fillteredLibs() {
            return this.sortedLibs.filter(
                item =>
                    (this.currentCategory === 'all' ||
                        item.territory === this.currentCategory) &&
                    item.employees <= this.currentEmployees
            )
        },
    },
    created() {
        if (this.libs.length === 0) {
            this.$store.dispatch('LOAD_DATA')
        }
    },
    watch: {
        currentCategory() {
            this.$store.dispatch(
                'UPDATE_EMPLOYEES_RANGE',
                this.sortedLibs.filter(
                    item =>
                        this.currentCategory === 'all' ||
                        item.territory === this.currentCategory
                )
            )
        },
    },
}
</script>
