// Стили в \sass\common\_map-popup.sass
<template>
	<div class="p-map df-popup" :class="{ isOpened: isOpened }">
		<a href="#" class="df-popup__close df-popup__close--mobile" @click.prevent="proxyIsOpened = false">
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect width="2.51415" height="20.1132" rx="0.5" transform="matrix(0.707105 -0.707108 0.707105 0.707108 0.000335693 1.77777)" fill="white"/>
				<rect width="2.51415" height="20.1132" rx="0.5" transform="matrix(-0.707105 -0.707108 -0.707105 0.707108 16 1.77777)" fill="white"/>
			</svg>
		</a>
		<div class="df-popup__wrapper" @mousedown.self="proxyIsOpened = false">
			<div class="p-map__inner df-popup__inner" :class="{ 'is-pending': loading }">
				<a href="#" class="df-popup__close df-popup__close--desctop" @click.prevent="proxyIsOpened = false">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect x="17.9397" y="16.2426" width="2.4" height="14.4" rx="0.5" transform="rotate(135 17.9397 16.2426)"/>
						<rect x="7.75739" y="17.9397" width="2.4" height="14.4" rx="0.5" transform="rotate(-135 7.75739 17.9397)"/>
					</svg>
				</a>
				<h2 class="p-map__title">Добавляем адрес доставки</h2>

				<drop-down is-large is-white attribute="city" label="Город или регион" :list="regList" :current-value="currentLocation" @change-value="setLocation" placeholder="Выберите город или регион"></drop-down>

				<div class="df-input">
					<input type="text" id="address" class="df-input__input" v-model="proxyStrAddress" @input="setPointDebounce" :placeholder="addressPlaceholder">
					<label for="address" class="df-input__label">{{ addressPlaceholder }}</label>
				</div>

				<div class="p-map__line">
					<div class="p-map__input p-map__input--30 df-input df-input--simple">
						<input type="text" class="df-input__input" placeholder="№ Подъезда" v-model="editedItem.H_SECTION">
					</div>
					<div class="p-map__input p-map__input--30 df-input df-input--simple">
						<input type="text" class="df-input__input" placeholder="№ Квартиры" v-model="editedItem.FLAT">
					</div>
					<div class="p-map__input p-map__input--30 df-input df-input--simple">
						<input type="text" class="df-input__input" placeholder="Этаж" v-model="editedItem.FLOOR">
					</div>
				</div>

				<label class="p-map__default df-checkbox df-checkbox--pink">
					<input type="checkbox" v-model="editedItem.DEFAULT">
					<div class="df-checkbox__box">
						<svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M13.2678 1.76777C13.463 1.96303 13.463 2.27961 13.2678 2.47487L5.41421 10.3284C5.21895 10.5237 4.90237 10.5237 4.70711 10.3284L0.353553 5.97487C0.158291 5.77961 0.158291 5.46303 0.353553 5.26777L1.76777 3.85355C1.96303 3.65829 2.27961 3.65829 2.47487 3.85355L4.70711 6.08579C4.90237 6.28105 5.21895 6.28105 5.41421 6.08579L11.1464 0.353553C11.3417 0.158291 11.6583 0.158291 11.8536 0.353553L13.2678 1.76777Z" fill="currentColor"/>
						</svg>
					</div>
					<div class="df-checkbox__description">Использовать этот адрес по умолчанию</div>
				</label>

				<div ref="map" class="p-map__map"></div>

				<button class="p-map__button df-btn df-btn--large df-btn--pink df-btn--white-text" :disabled="!currentLocationName || !strAddress">Сохранить</button>
			</div>
		</div>
	</div>
</template>

<script>
import _debounce from 'lodash.debounce'
import DropDown from '../Common/Dropdown.vue'

export default {
	name: 'MapPopup',
	components: { DropDown },
	props: {
		isOpened: {
			type: Boolean,
			required: true
		}
	},
	data () {
		return {
			myMap: null,
			point: null,
			regList: [
				{
					name: 'Москва',
					bounds: [[56.487377, 36.146740], [54.296121, 40.271232]],
					zoom: 8
				},
				{
					name: 'Санкт-петербург',
					bounds: [[60.204061, 29.645571], [59.81813456623752, 30.585724063605515]],
					zoom: 8
				},
				{
					name: 'Московская область',
					bounds: [[56.487377, 36.146740], [54.296121, 40.271232]],
					zoom: 8
				},
				{
					name: 'Ленинградская область',
					bounds: [[60.204061, 29.645571], [59.81813456623752, 30.585724063605515]],
					zoom: 8
				}
			],
			currentLocation: {},
			strAddress: '',
			loading: false,
			editedItem: {
				CITY: '',
				ADDRESS: '',
				H_SECTION: '',
				FLAT: '',
				FLOOR: '',
				COORDINATES: '',
				DEFAULT: false
			},
			defaultItem: {
				CITY: '',
				ADDRESS: '',
				H_SECTION: '',
				FLAT: '',
				FLOOR: '',
				COORDINATES: '',
				DEFAULT: false
			}
		}
	},
	computed: {
		proxyIsOpened: {
			get () {
				return this.isOpened
			},
			set () {
				this.$emit('close-popup')
			}
		},
		proxyStrAddress: {
			get () {
				return this.strAddress
			},
			set (val) {
				this.strAddress = val
			}
		},
		proxyAddress () {
			return this.strAddress ? this.strAddress : this.currentLocationName === 'Ленинградская область' ? 'Ленина' : this.currentLocationName
		},
		addressPlaceholder () {
			if (this.currentLocationName === 'Московская область' || this.currentLocationName === 'Ленинградская область') {
				return 'Нас. пункт, улица, дом *'
			} else {
				return 'Улица, дом *'
			}
		},
		currentLocationBounds () {
			return this.currentLocation.bounds
		},
		currentLocationName () {
			return this.currentLocation.name
		}
	},
	methods: {
		setLocation (val) {
			this.currentLocation = val

			// очистим поле адреса
			this.proxyStrAddress = ''

			// установим центр карты в выбраный регион
			this.setBounds(val.bounds)
			
			// установим туда метку
			this.setPointDebounce()
		},
		mapInit () {
			this.myMap = new ymaps.Map(this.$refs['map'], {
				center: [55.76, 37.64],
				zoom: 7,
				controls: ['zoomControl']
			});

			// Установил локацию по умолчанию
			this.setLocation(this.regList[0])
		},
		setBounds (bounds) {
			if (bounds && Array.isArray(bounds)) {
				this.myMap.setBounds(bounds, { checkZoomRange: true, duration: 500 })
			}	
		},
		setPoint () {
			if (this.proxyAddress) {
				ymaps.geocode(this.proxyAddress, {
					boundedBy: this.currentLocationBounds,
					strictBounds: true,
					results: 1,
					kind: 'house',
				}).then(
					(res) => {
						if (this.point) {
							this.myMap.geoObjects.remove(this.point);
						}

						this.point = res.geoObjects.get(0);
						this.point.options.set('draggable', true);
						this.myMap.geoObjects.add(this.point);

						const coords = this.point.geometry.getCoordinates();

						this.editedItem.COORDINATES = coords.join(',')

						if (coords) {
							this.myMap.setCenter(coords);
						}

						this.point.events.add([
							'dragend'
						], (e) => {
							let geoObject = e.get('target');
							this.getAddress(geoObject.geometry.getCoordinates());
							this.editedItem.COORDINATES = geoObject.geometry.getCoordinates().join(',')
						});

					},
					(err) => {
						console.log('error: ', err);
						// Обработка ошибки.
					}
				)
			}
			
		},
		getAddress (coords) {
			this.loading = true

			ymaps.geocode(coords).then((res) => {
				const firstGeoObject = res.geoObjects.get(0);
				const address = firstGeoObject.getAddressLine().split(',').slice(1);
				const city = address[0];
				const street = address.slice(1).join(',');

				this.proxyStrAddress = street.trim()

				this.loading = false
			});
		},
		clearForm () {
			this.editedItem = Object.assign({}, this.defaultItem)
			// Установил локацию по умолчанию
			this.setLocation(this.regList[0])
		}
	},
	watch: {
		isOpened () {
			if (this.isOpened) {
				document.body.style.overflow = 'hidden'
			} else {
				document.body.style.overflow = 'auto'
				this.clearForm()
			}
		},
		editedItem: {
			immediate: true,
			deep: true,
			handler () {
				this.editedItem.CITY = this.currentLocationName
			}
		},
		strAddress: {
			immediate: true,
			handler () {
				this.editedItem.ADDRESS = this.strAddress
			}
		}
	},
	created () {
		this.setPointDebounce = _debounce(this.setPoint.bind(this), 500)
	},
	mounted () {
		this.$nextTick(()=>{
			ymaps.ready(this.mapInit.bind(this));
		})
	}
}
</script>
