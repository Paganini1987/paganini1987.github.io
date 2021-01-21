<template>
    <div class="is-flex is-align-items-center is-flex-wrap-wrap">
        <span class="mr-3">{{ title }} ({{ current }}):</span>
        <div>
            <span class="mr-1">{{ range.min }}</span>
            <input
                type="range"
                :min="range.min"
                :max="range.max"
                @input="change($event)"
                :value="current"
            />
            <span class="ml-1">{{ range.max }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FilterByRange',
    model: {
        prop: 'current',
        event: 'change',
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        range: {
            type: Object,
            required: true,
            default: () => ({ min: 0, max: 100 }),
        },
        current: {
            type: Number,
            required: true,
        },
    },
    methods: {
        change(event) {
            this.$emit('change', event.target.value)
        },
    },
}
</script>
