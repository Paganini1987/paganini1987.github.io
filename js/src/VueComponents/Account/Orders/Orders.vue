<template>
	<div class="orders container">
		<div class="orders__active row">
			<div class="offset-lg-1 col-lg-5">
				<orders-card is-confirmed></orders-card>
			</div>
			<div class="col-lg-5">
				<orders-card is-await></orders-card>
			</div>
		</div>
		<div class="row">
			<div class="offset-lg-1 col-lg-10">
				<h2 class="orders__subtitle">Выполненные заказы</h2>
				<div class="orders__text">Вы ставите оценки и получаете бонусы. А мы создаем блюда, которые нравятся вам</div>
			</div>
		</div>
		<div class="orders__completed row">
			<div class="offset-lg-1 col-lg-5">
				<orders-card is-performed></orders-card>
			</div>
			<div class="col-lg-5">
				<orders-card is-performed></orders-card>
			</div>
		</div>
	</div>
</template>

<script>
import OrdersCard from './OrdersCard.vue'

export default {
	name: 'Orders',
	components: { OrdersCard },
	data () {
		return {
			
		}
	}
}
</script>

<style>

</style>