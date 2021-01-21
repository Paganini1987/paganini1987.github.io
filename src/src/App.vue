<template>
    <div id="app">
        <the-navbar />
        <progress v-if="loading" class="progress is-small is-primary" max="100"
            >15%</progress
        >
        <section class="section">
            <div class="container">
                <router-view />
            </div>
        </section>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import TheNavbar from '@/components/TheNavbar'
export default {
    components: { TheNavbar },
    computed: {
        ...mapGetters({
            loading: 'GET_LOADING_STATUS',
        }),
    },
}
</script>
