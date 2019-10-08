// Определяет сенсорные экраны
/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-touchevents-setclasses !*/
 !function(e,n,t){function o(e,n){return typeof e===n}function s(){var e,n,t,s,a,i,r;for(var l in c)if(c.hasOwnProperty(l)){if(e=[],n=c[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(s=o(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],r=i.split("."),1===r.length?Modernizr[r[0]]=s:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=s),f.push((s?"":"no-")+r.join("-"))}}function a(e){var n=u.className,t=Modernizr._config.classPrefix||"";if(p&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(o,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),p?u.className.baseVal=n:u.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):p?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function r(){var e=n.body;return e||(e=i(p?"svg":"body"),e.fake=!0),e}function l(e,t,o,s){var a,l,f,c,d="modernizr",p=i("div"),h=r();if(parseInt(o,10))for(;o--;)f=i("div"),f.id=s?s[o]:d+(o+1),p.appendChild(f);return a=i("style"),a.type="text/css",a.id="s"+d,(h.fake?h:p).appendChild(a),h.appendChild(p),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(n.createTextNode(e)),p.id=d,h.fake&&(h.style.background="",h.style.overflow="hidden",c=u.style.overflow,u.style.overflow="hidden",u.appendChild(h)),l=t(p,e),h.fake?(h.parentNode.removeChild(h),u.style.overflow=c,u.offsetHeight):p.parentNode.removeChild(p),!!l}var f=[],c=[],d={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){c.push({name:e,fn:n,options:t})},addAsyncTest:function(e){c.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=d,Modernizr=new Modernizr;var u=n.documentElement,p="svg"===u.nodeName.toLowerCase(),h=d._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];d._prefixes=h;var m=d.testStyles=l;Modernizr.addTest("touchevents",function(){var t;if("ontouchstart"in e||e.DocumentTouch&&n instanceof DocumentTouch)t=!0;else{var o=["@media (",h.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");m(o,function(e){t=9===e.offsetTop})}return t}),s(),a(f),delete d.addTest,delete d.addAsyncTest;for(var v=0;v<Modernizr._q.length;v++)Modernizr._q[v]();e.Modernizr=Modernizr}(window,document);
 
document.addEventListener("DOMContentLoaded", function() {
	var form = {
		elCalc: document.querySelector('.js-calc'),
		elForm: document.querySelector('.js-form'),
		elSuccess: document.querySelector('.js-success'),
		currentStep: 0,
		currentRoute: 'Диван',
		steps: null,
		routes: {
			'Диван': ['Что выбираете?', 'Какая комплектация дивана вас интересует?', 'Выберите расположение спального места', 'Выберите тип материала', 'Где планируете поставить?', 'finish'],
			'Кресло': ['Что выбираете?', 'Какой тип кресла вас интересует?', 'Выберите тип материала', 'Где планируете поставить?', 'finish'],
			'Кровать': ['Что выбираете?', 'Наличие подъемного механизма?', 'Выберите тип материала', 'Выберите размер спального места', 'finish'],
			'Матрас': ['Что выбираете?', 'Выберите жесткость матраса', 'Выберите размер спального места', 'finish']
		},
		data: {
			'Что выбираете?': ['Диван']
		},
		phone: '',
		phoneMask: null,
		phoneMask2: null,
		controller () {
			var step = this.routes[this.currentRoute][this.currentStep];

			[].forEach.call(this.steps, (s)=>{
				if (step == s.dataset.step) {
					this.showStep(s)
					this.setProgress()
					this.checkButtons()
					this.validation()
				}
			})
		},
		validation () {
			var step = this.routes[this.currentRoute][this.currentStep];

			if (step in this.data) {
				if (this.data[step].length > 0) {
					this.statusNext(true);
					return true
				}
			}

			this.statusNext(false);
			return false
		},
		statusNext (status) {
			var next = document.querySelector('.js-next-step');

			if (!status) {
				next.classList.add('invalid')
			} else {
				next.classList.remove('invalid')
			}
		},
		progress () {
			return Math.round((this.currentStep / (this.routes[this.currentRoute].length - 2)) * 100)
		},
		setProgress () {
			var output = document.querySelector('.js-set-progress'),
				indicator = document.querySelector('.js-set-indicator'),
				p = document.querySelector('.w-progress');

			output.innerHTML = this.progress();
			indicator.style.width = this.progress() + '%';

			if (this.progress() === 0) {
				p.classList.add('null')
			} else {
				p.classList.remove('null')
			}
		},
		showStep (step) {
			[].forEach.call(this.steps, (s)=>{
				s.hidden = true;
			})
			step.hidden = false;
		},
		getDataStep (el) {
			return el.closest('.js-step').dataset.step
		},
		checkButtons () {
			var prev = document.querySelector('.js-prev-step'),
				next = document.querySelector('.js-next-step'),
				footer = document.querySelector('.w__footer');

			if (this.currentStep === this.routes[this.currentRoute].length - 1) {
				footer.hidden = true;
			} else {
				footer.hidden = false;
			}

			if (this.currentStep === 0) {
				prev.hidden = true;
			} else {
				prev.hidden = false;
			}
		},
		openCalc () {
			this.elCalc.classList.add('isOpened');
		},
		closeCalc () {
			this.elCalc.classList.remove('isOpened');
			this.refreshCalc();
		},
		openForm () {
			this.elForm.classList.add('isOpened');
		},
		closeForm () {
			this.elForm.classList.remove('isOpened');
		},
		openSuccess () {
			this.elSuccess.classList.add('isOpened')
		},
		closeSuccess () {
			this.elSuccess.classList.remove('isOpened')
		},
		refreshCalc () {
			this.currentStep = 0;
			this.currentRoute = 'Диван';
			this.data = {
				'Что выбираете?': ['Диван']
			}
			var inputs = document.querySelectorAll('.js-input');

			[].forEach.call(inputs, (s)=>{
				s.checked = false;
				if (s.value === 'Диван') {
					s.checked = true;
				}
			})

			document.querySelector('.js-input-input').value = '';
			document.querySelector('.js-calc-accept').checked = false;
			this.phoneMask.typedValue = ''

			this.controller();
		},
		clearInputs () {
			var inputs = document.querySelectorAll('.js-input');

			[].forEach.call(inputs, (s)=>{
				if (s.name !== 'firststep') {
					s.checked = false;
				}
			})

			document.querySelector('.js-input-input').value = '';
		},
		sendData (data) {
			return fetch('/ajax/widgetSend.php', {
				method: 'POST',
				headers: {
				  'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(data)
			})
		},
		init () {
			//Определим шаги формы
			this.steps = document.querySelectorAll('.js-step');
			//Кнопка далее
			document.querySelector('.js-next-step').addEventListener('click', ()=>{
				var length = this.routes[this.currentRoute].length;

				if (!this.validation()) {
					alert('Пожалуйста, заполните необходимые поля')
					return null;
				}

				if (this.currentStep < length - 1) {
					this.currentStep++;
				}

				this.controller();
			})
			//Кнопка назад
			document.querySelector('.js-prev-step').addEventListener('click', (e)=>{
				if (this.currentStep > 0) {
					this.currentStep--;
				}

				this.controller();
			})
			//Кнопка Получить расчет
			document.querySelector('.js-submit').addEventListener('click', (e)=>{
				var accept = document.querySelector('.js-calc-accept');

				if (accept.checked && 'Телефон' in this.data && this.data['Телефон'] !== '') {
					this.sendData(this.data)
						.then((response)=>{
							if (response.ok) {
								this.openSuccess()
								this.closeCalc()
								setTimeout(()=>{
									this.closeSuccess();
								}, 7000)
							} else {
								throw new Error();
							}
						})
						.catch((e)=>{
							alert('Произошла ошибка отправки формы, повторите попытку позднее.')
							console.log(e);
						})
					
				} else {
					alert('Пожалуйста, заполните необходимые поля')
				}
			})
			//Кнопка Заказать
			document.querySelector('.js-submit-2').addEventListener('click', (e)=>{
				var accept = document.querySelector('.js-form-accept');

				if (accept.checked && this.phone !== '') {
					this.sendData(this.phone)
						.then((response)=>{
							if (response.ok) {
								this.openSuccess()
								this.closeForm()
								setTimeout(()=>{
									this.closeSuccess();
								}, 7000)
							} else {
								throw new Error();
							}
						})
						.catch((e)=>{
							alert('Произошла ошибка отправки формы, повторите попытку позднее.')
							console.log(e);
						})
				} else {
					alert('Пожалуйста, заполните необходимые поля')
				}
			})
			//События на инпутах
			document.addEventListener('change', (e)=>{
				if (e.target.classList.contains('js-input')) {
					var el = e.target,
						step = this.getDataStep(el),
						checked = e.target.checked;

					if (step === 'Что выбираете?') {
						this.clearInputs();
						this.currentRoute = el.value;
						this.data = {};
						this.data[step] = [el.value];
					} else if (step in this.data) {
						if (el.type === 'checkbox') {
							if (checked) {
								this.data[step].push(el.value)
							} else {
								this.data[step].splice(this.data[step].indexOf(el.value),1)
							}
						} else if (el.type === 'radio') {
							if (checked) {
								this.data[step] = [];
								this.data[step].push(el.value);
							}
						} else {
							this.data[step] = [el.value];
						}
					} else {
						this.data[step] = [];

						if (el.type === 'checkbox' || el.type === 'radio') {
							if (checked) {
								this.data[step].push(el.value)
							}
						}
					}
				}
				
				this.validation();
			})
			document.addEventListener('input', (e)=>{
				if (e.target.classList.contains('js-input-input')) {
					var el = e.target,
						step = this.getDataStep(el);

					if (el.value !== '') {
						this.data[step] = [el.value];
					} else {
						this.data[step] = [];
					}
				}
				
				this.validation();
			})
			//Кнопки на панели
			document.addEventListener('click', (e)=>{
				var el = e.target.closest('.s-panel__item'),
					item = '';

				if (el && el.classList.contains('s-panel__item')) {
					item = el.dataset.item;

					if (item == 'calc') {
						this.openCalc()
					}
					if (item == 'form') {
						this.openForm()
					}
					if (item == 'bonus') {
						window.location = 'https://formula-divana.ru/bonus/'
					}
				}
			})
			//Закрыть калькулятор
			document.querySelector('.js-calc-close').addEventListener('click', (e)=>{
				e.preventDefault();

				this.closeCalc();
			})
			//Закрыть форму
			document.querySelector('.js-form-close').addEventListener('click', (e)=>{
				e.preventDefault();

				this.closeForm();
			})
			//Закрыть success
			document.querySelector('.js-success-close').addEventListener('click', (e)=>{
				e.preventDefault();

				this.closeSuccess();
			})
			//Маска
			this.phoneMask = IMask(document.getElementById('tel'), {
				mask: '+{7 }(000)000-00-00',
				lazy: false,  // make placeholder always visible
				placeholderChar: '_'     // defaults to '_'
			});

			this.phoneMask.on("accept", ()=>{
				this.data['Телефон'] = ''
			});

			this.phoneMask.on("complete", ()=>{
				this.data['Телефон'] = this.phoneMask.value
			});

			//Маска 2
			this.phoneMask2 = IMask(document.getElementById('tel2'), {
				mask: '+{7 }(000)000-00-00',
				lazy: false,  // make placeholder always visible
				placeholderChar: '_'     // defaults to '_'
			});

			this.phoneMask2.on("accept", ()=>{
				this.phone = ''
			});

			this.phoneMask2.on("complete", ()=>{
				this.phone = this.phoneMask2.value
			});

			//Установм первый шаг
			this.controller();
		}
	}

	form.init();

	// window.form = form;
});

//Полифилл для closest и matches IE
(function () {

	// проверяем поддержку
	if (!Element.prototype.matches) {

		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;

	}

})();
(function () {

	// проверяем поддержку
	if (!Element.prototype.closest) {

		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;

			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();