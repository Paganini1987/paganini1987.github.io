<template>
	<div class="p-cards">
		<h2 class="p-cards__title a-title">Банковские карты</h2>
		<ul class="p-cards__list">
			<li class="p-cards__item a-item">
				<label class="a-item__pin df-pin">
					<input type="radio" name="cards">
					<div class="df-pin__circle"></div>
				</label>
				<div class="a-item__text">VISA **** 1407</div>
				<div class="a-item__note">(по умолчанию)</div>
				<a href="@" class="a-item__delete">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect x="17.9397" y="16.2427" width="2.4" height="14.4" rx="0.5" transform="rotate(135 17.9397 16.2427)"/>
						<rect x="7.75737" y="17.9399" width="2.4" height="14.4" rx="0.5" transform="rotate(-135 7.75737 17.9399)"/>
					</svg>
				</a>
			</li>
			<li class="p-cards__item a-item">
				<label class="a-item__pin df-pin">
					<input type="radio" name="cards">
					<div class="df-pin__circle"></div>
				</label>
				<div class="a-item__text">Master Card World **** 2324</div>
				<div class="a-item__note">(по умолчанию)</div>
				<a href="@" class="a-item__delete">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect x="17.9397" y="16.2427" width="2.4" height="14.4" rx="0.5" transform="rotate(135 17.9397 16.2427)"/>
						<rect x="7.75737" y="17.9399" width="2.4" height="14.4" rx="0.5" transform="rotate(-135 7.75737 17.9399)"/>
					</svg>
				</a>
			</li>
		</ul>
		<button class="p-cards__button df-btn df-btn--med df-btn--bordered df-btn--pink">+ Добавить карту</button>
	</div>
</template>

<script>
export default {
	name: 'PersonalCards'
}
</script>

<style>

</style>