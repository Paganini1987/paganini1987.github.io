<template>
	<div class="p-edit container">
		<div class="row">
			<div class="offset-md-1 col-md-5">
				<h2 class="p-edit__title a-title">Редактируем Информацию</h2>
				<form class="p-edit__form">
					<div class="p-edit__item p-edit__item--50">
						<div class="df-input">
							<input type="text" id="name" class="df-input__input" placeholder="Введите имя" v-model="editedData.name" @blur="focusLost('name')" :class="{ invalid: !validation.name }">
							<label for="name" class="df-input__label">Имя</label>
						</div>
					</div>
					<div class="p-edit__item p-edit__item--50">
						<div class="df-input">
							<input type="text" id="surname" class="df-input__input" placeholder="Введите фамилию" v-model="editedData.surname" @blur="focusLost('surname')" :class="{ invalid: !validation.surname }">
							<label for="surname" class="df-input__label">Фамилия</label>
						</div>
					</div>
					<div class="p-edit__item p-edit__item--50">
						<div class="df-input" @click="smsPopup = true">
							<the-mask style="pointer-events: none;" mask="+7 ### ### ## ##" type="tel" :masked="true" id="tel" v-model="editedData.tel" class="df-input__input" autocomplete="off"></the-mask>
							<label for="tel" class="df-input__label">Телефон</label>
						</div>
					</div>
					<div class="p-edit__item p-edit__item--50">
						<div class="df-input">
							<input type="email" id="email" class="df-input__input" placeholder="Адрес эл. Почты">
							<label for="email" class="df-input__label">Адрес эл. Почты</label>
						</div>
					</div>
					<div class="p-edit__item p-edit__item--50">
						<div class="df-gender">
							<label class="df-gender__label">
								<input type="radio" name="gender" class="df-gender__input" checked>
								<div class="df-gender__description" data-gender="male">Мужской</div>
								<div class="df-gender__lb">Пол</div>
							</label>
							<label class="df-gender__label">
								<input type="radio" name="gender" class="df-gender__input">
								<div class="df-gender__description" data-gender="female">Женский</div>
							</label>
						</div>
					</div>
					<div class="p-edit__item p-edit__item--100">
						<div class="df-date">
							<div class="df-date__day df-input">
								<input data-type="day" v-model.number="editedData.dayOfBirth" type="number" id="day" class="df-input__input" placeholder="День" :class="{ invalid: !validation.dayOfBirth }">
								<label for="day" class="df-input__label">Дата рождения</label>
							</div>
							
							<drop-down is-large is-simple is-white label="" :list="monthList" :current-value="editedData.montOfBirth" @change-value="setMonth"></drop-down>

							<div class="df-input df-input--simple">
								<input data-type="year" v-model.number="editedData.yearOfBirth" type="number" id="year" class="df-input__input" placeholder="Год" :class="{ invalid: !validation.yearOfBirth }">
							</div>
						</div>
					</div>
					<div class="p-edit__item p-edit__item--100">
						<search :list="searchList" @select-item="addChip"></search>

						<div class="p-edit__chips">
							<div class="df-chip df-chip--editable" v-for="(dish, index) in editedData.selectedDishes" :key="index">
								{{ dish }}
								<a href="#" @click.prevent="removeChip(dish)" class="df-chip__close"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="14.9497" y="13.5356" width="2" height="12" rx="0.5" transform="rotate(135 14.9497 13.5356)" fill="white"></rect> <rect x="6.46448" y="14.9497" width="2" height="12" rx="0.5" transform="rotate(-135 6.46448 14.9497)" fill="white"></rect></svg></a>
							</div>
						</div>
					</div>
					
					<button class="p-edit__button df-btn df-btn--large df-btn--pink df-btn--white-text" :disabled="!isChanged">Сохранить изменения</button>
				</form>
			</div>
		</div>

		<sms-popup :isOpened="smsPopup" @close-popup="smsPopup = false"></sms-popup>
	</div>
</template>

<script>
import DropDown from '../../Common/Dropdown.vue'
import Search from '../../Common/Search.vue'
import SmsPopup from '../../Common/SMSPopup.vue'
import {TheMask} from 'vue-the-mask'

export default {
	name: 'PersonalEdit',
	components: { DropDown, Search, SmsPopup, TheMask },
	data () {
		return {
			monthList: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			searchList: ['Картошка', 'Курица', 'Борщ', 'Пюре', 'Пицца', 'Роллы', 'Салат Цезарь', 'Салат Оливье'],
			editedData: {
				name: 'Алексей',
				surname: 'Ашихмин',
				tel: '+7 777 666 55 11',
				dayOfBirth: '',
				montOfBirth: 'Январь',
				yearOfBirth: '',
				selectedDishes: ['Картошка']
			},
			blur: {
				name: false,
				surname: false
			},
			smsPopup: false,
			isChanged: false
		}
	},
	computed: {
		validation () {
			const reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

			return {
				name: this.editedData.name.trim() !== '',
				surname: this.editedData.surname.trim() !== '',
				dayOfBirth: this.editedData.dayOfBirth > 0 && this.editedData.dayOfBirth < 32 || !!this.editedData.dayOfBirth === false,
				yearOfBirth: this.editedData.yearOfBirth > 1900 && this.editedData.yearOfBirth <= new Date().getFullYear() || !!this.editedData.yearOfBirth === false
			}
		}
	},
	methods: {
		setMonth (val) {
			this.editedData.montOfBirth = val
		},
		addChip (val) {
			this.editedData.selectedDishes.push(val)
		},
		removeChip (val) {
			this.editedData.selectedDishes.splice(this.editedData.selectedDishes.indexOf(val), 1)
		},
		focusLost: function (name) {
			this.blur[name] = true;
		},
	},
	watch: {
		editedData: {
			deep: true,
			handler () {
				this.isChanged = true
			}
		}
	}
}
</script>

<style>

</style>
