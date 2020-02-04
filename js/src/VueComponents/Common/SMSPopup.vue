<template>
	<div class="p-sms df-popup" :class="{ isOpened: isOpened }">
		<a href="#" class="p-sms__close df-popup__close df-popup__close--mobile" @click.prevent="proxyIsOpened = false">
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect width="2.51415" height="20.1132" rx="0.5" transform="matrix(0.707105 -0.707108 0.707105 0.707108 0.000335693 1.77777)" fill="white"/>
				<rect width="2.51415" height="20.1132" rx="0.5" transform="matrix(-0.707105 -0.707108 -0.707105 0.707108 16 1.77777)" fill="white"/>
			</svg>
		</a>
		<div class="df-popup__wrapper" @mousedown.self="proxyIsOpened = false">
			<div class="p-sms__inner df-popup__inner">
				<a href="#" class="p-sms__close df-popup__close df-popup__close--desctop" @click.prevent="proxyIsOpened = false">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect x="17.9397" y="16.2426" width="2.4" height="14.4" rx="0.5" transform="rotate(135 17.9397 16.2426)"/>
						<rect x="7.75739" y="17.9397" width="2.4" height="14.4" rx="0.5" transform="rotate(-135 7.75739 17.9397)"/>
					</svg>
				</a>
				<h2 class="p-sms__title">{{ title }}</h2>

				<div class="p-sms__text" v-html="text"></div>

				<form @submit.prevent="submit">
					<button v-if="codeSended" @click.prevent="reset" href="#" class="p-sms__change df-btn">Изменить номер</button>

					<div v-if="!codeSended" class="df-input df-input--simple">
						<the-mask ref="tel" mask="+7 ### ### ## ##" type="tel" :masked="true" v-model="tel" class="df-input__input"></the-mask>
					</div>

					<div v-else class="p-sms__code">
						<div class="df-input">
							<input v-model="n1" type="text" maxlength="1" class="df-input__input">
						</div>
						<div class="df-input">
							<input v-model="n2" type="text" maxlength="1" class="df-input__input">
						</div>
						<div class="df-input">
							<input v-model="n3" type="text" maxlength="1" class="df-input__input">
						</div>
						<div class="df-input">
							<input v-model="n4" type="text" maxlength="1" class="df-input__input">
						</div>
					</div>

					<button type="submit" class="p-sms__button df-btn df-btn--large df-btn--blue" :disabled="(!validTel && !codeSended) || (!validCode && codeSended)">{{ buttonText }}</button>

					<div v-if="!codeSended" class="p-sms__bottom-text">Нажимая «Получить код», вы принимаете условия <a href="#" target="_blank" class="p-sms__link">пользовательского соглашения</a>.</div>
					
					<template v-else>
						<div class="p-sms__bottom-text">Повторно отправить код подтверждения вы сможете через <span><span class="p-sms__val">{{ proxyTimeout }}</span> секунд</span></div>

						<button @click.prevent="getCode" class="p-sms__repeat df-btn" :disabled="!allowSendRepeatedly">Выслать код повторно</button>
					</template>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import {TheMask} from 'vue-the-mask'

export default {
	name: 'SmsPopup',
	components: { TheMask },
	props: {
		isOpened: {
			type: Boolean,
			required: true
		}
	},
	data () {
		return {
			tel: '',
			n1: '',
			n2: '',
			n3: '',
			n4: '',
			codeSended: false,
			allowSendRepeatedly: false,
			timeout: 60,
			proxyTimeout: 0,
			intId: 0
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
		validTel () {
			return this.tel.length === 16
		},
		validCode () {
			return (this.n1+this.n2+this.n3+this.n4).length == 4
		},
		title () {
			return this.codeSended ? 'Введите код из СМС' : 'Авторизация'
		},
		text () {
			return this.codeSended ? `Мы отправили его на номер <br>${ this.tel }` : 'Введите номер вашего телефона, чтобы мы выслали вам код доступа'
		},
		buttonText () {
			return this.codeSended ? 'Отправить' : 'Получить код'
		}
	},
	methods: {
		submit () {
			if (this.codeSended) {
				alert('Успех')
				
				this.reset()
				this.proxyIsOpened = false
			} else {
				this.getCode()
			}
		},
		getCode () {
			this.codeSended = true;
			this.allowSendRepeatedly = false;
			this.proxyTimeout = this.timeout;

			setTimeout(()=>{
				alert('Привет! Я СМС с кодом: 1234')
			}, 1000)

			this.intId = setInterval(()=>{
				this.proxyTimeout--

				if (this.proxyTimeout === 0) {
					clearInterval(this.intId)
					
					this.allowSendRepeatedly = true
				}
			}, 1000)
		},
		reset () {
			clearInterval(this.intId)
			this.codeSended = false
			this.allowSendRepeatedly = false
			this.proxyTimeout = this.timeout
			this.tel = ''
			this.n1 = ''
			this.n2 = ''
			this.n3 = ''
			this.n4 = ''
		}
	},
	created () {
		this.proxyTimeout = this.timeout
	},
	watch: {
		isOpened () {
			if (this.isOpened) {
				document.body.style.overflow = 'hidden'
				this.$refs['tel'].$el.focus()
			} else {
				document.body.style.overflow = 'auto'
			}
		}
	}
}
</script>

<style>

</style>