<template>
	<div class="p-addr">
		<h2 class="p-addr__title a-title">Адреса доставки</h2>
		<ul class="p-addr__list">
			<li class="p-addr__item a-item">
				<label class="a-item__pin df-pin">
					<input type="radio" name="addr">
					<div class="df-pin__circle"></div>
				</label>
				<div class="a-item__text">Москва, ул. Тверская-Ямская, 8 стр. 1, кв. 99</div>
				<div class="a-item__note">(по умолчанию)</div>
				<a href="#" class="a-item__action">Редактировать </a>
				<a href="@" class="a-item__delete">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect x="17.9397" y="16.2427" width="2.4" height="14.4" rx="0.5" transform="rotate(135 17.9397 16.2427)"/>
						<rect x="7.75737" y="17.9399" width="2.4" height="14.4" rx="0.5" transform="rotate(-135 7.75737 17.9399)"/>
					</svg>
				</a>
			</li>
			<li class="p-addr__item a-item">
				<label class="a-item__pin df-pin">
					<input type="radio" name="addr">
					<div class="df-pin__circle"></div>
				</label>
				<div class="a-item__text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores, pariatur?</div>
				<div class="a-item__note">(по умолчанию)</div>
				<a href="#" class="a-item__action">Редактировать </a>
				<a href="@" class="a-item__delete">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect x="17.9397" y="16.2427" width="2.4" height="14.4" rx="0.5" transform="rotate(135 17.9397 16.2427)"/>
						<rect x="7.75737" y="17.9399" width="2.4" height="14.4" rx="0.5" transform="rotate(-135 7.75737 17.9399)"/>
					</svg>
				</a>
			</li>
		</ul>
		<button @click="openMapPopup" class="p-addr__button df-btn df-btn--med df-btn--bordered df-btn--pink">+ Добавить адрес</button>
	</div>
</template>

<script>
export default {
	name: 'PersonalAdresses',
	methods: {
		openMapPopup () {
			this.$emit('open-map-popup')
		}
	}
}
</script>

<style>

</style>