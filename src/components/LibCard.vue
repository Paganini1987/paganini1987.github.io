<template>
    <article class="box">
        <h3 class="title is-5">{{ inputData.fullname }}</h3>

        <div class="content">
            <p>Адрес: {{ inputData.address }}</p>
            <p>Сотрудники: {{ inputData.employees }}</p>
            <p>Бюджет: {{ inputData.funds_budget | priceFormat }}</p>
            <p>Копии: {{ inputData.copies }}</p>
            <p>Подписчики: {{ inputData.subscribers }}</p>
        </div>

        <router-link class="button is-info" :to="`/libs/${inputData.kopuk}`"
            >Подробнее</router-link
        >
    </article>
</template>

<script>
export default {
    name: 'LibCart',
    props: {
        inputData: {
            type: Object,
            requires: true,
        },
    },
    filters: {
        priceFormat(value) {
            return (
                value
                    .toString()
                    .replace(/\D/g, '')
                    .replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/g, ' ') + ' ₽'
            )
        },
    },
}
</script>
