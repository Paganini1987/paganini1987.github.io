<template>
	<div class="p-main">
		<h2 class="p-main__title a-title">Основное</h2>
		<table class="p-main__table">
			<tr>
				<td>Имя:</td>
				<td>Алексей</td>
			</tr>
			<tr>
				<td>Фамилия:</td>
				<td>Ашихмин</td>
			</tr>
			<tr>
				<td>Телефон:</td>
				<td>–</td>
			</tr>
			<tr>
				<td>Эл. почта:</td>
				<td>–</td>
			</tr>
			<tr>
				<td>Пол:</td>
				<td>Мужской</td>
			</tr>
			<tr>
				<td>Дата рождения:</td>
				<td>26.03.1988</td>
			</tr>
			<tr>
				<td>Любимое блюдо:</td>
				<td>
					<div class="p-main__chips">
						<div class="df-chip">
							Картошка
						</div>
						<div class="df-chip">
							Курица
						</div>
					</div>
				</td>
			</tr>
		</table>
		<a href="/account-personal-edit.html" class="p-main__button df-btn df-btn--med df-btn--bordered df-btn--pink">Редактировать информацию</a>
	</div>
</template>

<script>
export default {
	name: 'PersonalMain'
}
</script>

<style>

</style>