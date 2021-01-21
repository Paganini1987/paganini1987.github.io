<template>
    <div class="is-flex is-align-items-center is-flex-wrap-wrap">
        <span class="mr-3">{{ title }}</span>
        <div class="select">
            <select v-model="sortBy">
                <option value="employees">Сотрудники</option>
                <option value="funds_budget">Бюджет</option>
                <option value="copies">Копий</option>
                <option value="subscribers">Подписчиков</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SortBy',
    props: {
        title: {
            type: String,
            required: true,
        },
    },
    computed: {
        sortBy: {
            get() {
                return this.$store.getters['GET_SORT_BY']
            },
            set(value) {
                this.$store.dispatch('UPDATE_SORT_BY', value)
            },
        },
    },
}
</script>
