// Status:
// Подтвержденный;
// Отмененный; 
// Выполненный; 
// Ожидает подтверждения. 
<template>
	<div class="o-card">

		<div v-if="isConfirmed" class="o-card__status o-card__status--confirmed">
			<div class="o-card__s-icon o-card__s-icon--confirmed">
				<svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M13.2678 1.76777C13.463 1.96303 13.463 2.27961 13.2678 2.47487L5.41421 10.3284C5.21895 10.5237 4.90237 10.5237 4.70711 10.3284L0.353553 5.97487C0.158291 5.77961 0.158291 5.46303 0.353553 5.26777L1.76777 3.85355C1.96303 3.65829 2.27961 3.65829 2.47487 3.85355L4.70711 6.08579C4.90237 6.28105 5.21895 6.28105 5.41421 6.08579L11.1464 0.353553C11.3417 0.158291 11.6583 0.158291 11.8536 0.353553L13.2678 1.76777Z" fill="white"/>
				</svg>
			</div>
			<span>Подтвержден</span>
		</div>

		<div v-if="isAwait" class="o-card__status o-card__status--await">
			<div class="o-card__s-icon o-card__s-icon--await">
				<svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="2" cy="2" r="2" fill="white"/>
					<circle cx="8" cy="2" r="2" fill="white"/>
					<circle cx="14" cy="2" r="2" fill="white"/>
				</svg>
			</div>
			<span>Ожидает подтверждения</span>
		</div>

		<div class="o-card__content">
			<table class="o-card__table">
				<tr>
					<td>Дата доставки:</td>
					<td>18 ноября</td>
				</tr>
				<tr>
					<td>Время доставки:</td>
					<td>17:00 – 20:00</td>
				</tr>
				<tr v-if="isConfirmed">
					<td>Стоимость:</td>
					<td>3 390 ₽</td>
				</tr>
			</table>
		</div>
		
		<div class="o-card__footer">
			<template v-if="isConfirmed">
				<button class="o-card__button o-card__button--change df-btn df-btn--med df-btn--bordered df-btn--pink">Изменить заказ</button>
				<button class="o-card__button o-card__button--cancel df-btn">Отменить заказ</button>
			</template>

			<template v-if="isAwait">
				<button class="o-card__button o-card__button--confirm df-btn df-btn--med df-btn--bordered df-btn--pink">Проверить заказ и подтвердить</button>
			</template>

			<template v-if="isPerformed">
				<button class="o-card__button o-card__button--confirm df-btn df-btn--med df-btn--bordered df-btn--pink">Проверить заказ и подтвердить</button>
			</template>
			
		</div>
	</div>
</template>

<script>
export default {
	name: 'OrdersCard',
	props: {
		isConfirmed: {
			type: Boolean
		},
		isCanceled: {
			type: Boolean
		},
		isPerformed: {
			type: Boolean
		},
		isAwait: {
			type: Boolean
		}
	}
}
</script>

<style>

</style>