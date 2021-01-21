<template>
    <div class="about">
        <h1 class="title">{{ currentLib.fullname }}</h1>

        <table class="table">
            <tr v-for="(value, key) in currentLib" :key="key">
                <td>{{ key }}</td>
                <td>{{ value }}</td>
            </tr>
        </table>

        <router-link to="/">На главную</router-link>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Detail',
    computed: {
        ...mapGetters({
            libs: 'GET_DATA',
        }),
        currentLib() {
            return this.libs.filter(
                lib => lib.kopuk === this.$route.params.id
            )[0]
        },
    },
}
</script>
<style lang="css" scoped>
table {
    width: 100%;
    table-layout: fixed;
}
td {
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
