<template>
	<div class="personal container">
		<div class="row">
			<div class="offset-lg-1 col-lg-5 offset-md-1 col-md-7 col-sm-12">
				<personal-progress></personal-progress>
				<personal-main></personal-main>
				<personal-addresses @open-map-popup="openMapPopup = true"></personal-addresses>
				<personal-cards></personal-cards>
				<button class="personal__button df-btn df-btn--large df-btn--bordered df-btn--pink">Выйти из аккаунта</button>

				<map-popup :isOpened="openMapPopup" @close-popup="openMapPopup = false"></map-popup>
			</div>
		</div>
	</div>
</template>

<script>
import PersonalProgress from './PersonalProgress.vue'
import PersonalMain from './PersonalMain.vue'
import PersonalAddresses from './PersonalAddresses.vue'
import PersonalCards from './PersonalCards.vue'
import MapPopup from '../../Common/MapPopup.vue'

export default {
	name: 'Personal',
	components: { PersonalMain, PersonalProgress, PersonalAddresses, PersonalCards, MapPopup },
	data () {
		return {
			openMapPopup: false
		}
	}
}
</script>

<style>

</style>