<template>
    <div class="is-flex is-align-items-center is-flex-wrap-wrap">
        <span class="mr-3">{{ title }}:</span>
        <div class="select">
            <select @change="change($event)" :checked="selected">
                <option value="all">Все</option>
                <option v-for="(item, i) in list" :key="i" :value="item">{{
                    item
                }}</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FilterBy',
    props: {
        list: {
            type: Array,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        selected: {
            type: String,
            required: true,
        },
    },
    model: {
        prop: 'selected',
        event: 'change',
    },
    methods: {
        change(event) {
            this.$emit('change', event.target.value)
        },
    },
}
</script>
