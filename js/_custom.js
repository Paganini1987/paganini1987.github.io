// Определяет сенсорные экраны
/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-touchevents-setclasses !*/
 !function(e,n,t){function o(e,n){return typeof e===n}function s(){var e,n,t,s,a,i,r;for(var l in c)if(c.hasOwnProperty(l)){if(e=[],n=c[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(s=o(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],r=i.split("."),1===r.length?Modernizr[r[0]]=s:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=s),f.push((s?"":"no-")+r.join("-"))}}function a(e){var n=u.className,t=Modernizr._config.classPrefix||"";if(p&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(o,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),p?u.className.baseVal=n:u.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):p?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function r(){var e=n.body;return e||(e=i(p?"svg":"body"),e.fake=!0),e}function l(e,t,o,s){var a,l,f,c,d="modernizr",p=i("div"),h=r();if(parseInt(o,10))for(;o--;)f=i("div"),f.id=s?s[o]:d+(o+1),p.appendChild(f);return a=i("style"),a.type="text/css",a.id="s"+d,(h.fake?h:p).appendChild(a),h.appendChild(p),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(n.createTextNode(e)),p.id=d,h.fake&&(h.style.background="",h.style.overflow="hidden",c=u.style.overflow,u.style.overflow="hidden",u.appendChild(h)),l=t(p,e),h.fake?(h.parentNode.removeChild(h),u.style.overflow=c,u.offsetHeight):p.parentNode.removeChild(p),!!l}var f=[],c=[],d={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){c.push({name:e,fn:n,options:t})},addAsyncTest:function(e){c.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=d,Modernizr=new Modernizr;var u=n.documentElement,p="svg"===u.nodeName.toLowerCase(),h=d._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];d._prefixes=h;var m=d.testStyles=l;Modernizr.addTest("touchevents",function(){var t;if("ontouchstart"in e||e.DocumentTouch&&n instanceof DocumentTouch)t=!0;else{var o=["@media (",h.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");m(o,function(e){t=9===e.offsetTop})}return t}),s(),a(f),delete d.addTest,delete d.addAsyncTest;for(var v=0;v<Modernizr._q.length;v++)Modernizr._q[v]();e.Modernizr=Modernizr}(window,document);

document.addEventListener("DOMContentLoaded", function() {
	// Header discount
	if (Modernizr.touchevents) {
		$('.js-discount-show-on-mobile').on('click', function (e) {
			e.preventDefault()

			$(this).closest('.h-discount').toggleClass('isOpened')
		})
		$('.js-discount-close-on-mobile').on('click', function (e) {
			e.preventDefault()

			$(this).closest('.h-discount').removeClass('isOpened')
		})
		$(document).on('click', function (e) {
			if($(e.target).closest('.h-discount').length === 0) {
				$('.h-discount').removeClass('isOpened')
			}
		})
	}

	$(document).on('click', '.df-dropdown__head', function (e) {
		e.preventDefault()

		var $current = $(this).closest('.js-dropdown');

		$('.js-dropdown').not($current).removeClass('isOpened')
		$current.toggleClass('isOpened')
	})
	$(document).on('click', function (e) {
		if($(e.target).closest('.js-dropdown').length === 0) {
			$('.js-dropdown').removeClass('isOpened')
		}
	})

	$('.js-switch').on('click', function(e) {
		e.stopPropagation();

		$(this).toggleClass('selected')
	})

	// Open dish popup
	$('.dish').on('click', function(e) {
		e.preventDefault()

		$('body').addClass('p-dish-opened')
		$('body').addClass('fix-overflow')
	})

	// Close dish popup
	$('.js-close-dish-popup').on('click', function(e) {
		e.preventDefault()

		$('body').removeClass('p-dish-opened')
		$('body').removeClass('fix-overflow')
	})
	$(document).on('click', function (e) {
		if ($(e.target).closest('.df-popup__inner').length === 0 && $(e.target).closest('.dish').length === 0) {
			if ($('body').hasClass('p-dish-opened')) {
				$('body').removeClass('p-dish-opened')
				$('body').removeClass('fix-overflow')
			}
		}
	})

	// Open main popup
	$('.js-open-main-popup').on('click', function(e) {
		e.preventDefault()

		$('body').addClass('p-main-opened')
		$('body').addClass('fix-overflow')
	})

	// Close main popup
	$('.js-close-main-popup').on('click', function(e) {
		e.preventDefault()

		$('body').removeClass('p-main-opened')
		$('body').removeClass('fix-overflow')
	})
	$(document).on('click', function (e) {
		if ($(e.target).closest('.df-popup__inner').length === 0 && $(e.target).closest('.js-open-main-popup').length === 0) {
			if ($('body').hasClass('p-main-opened')) {
				$('body').removeClass('p-main-opened')
				$('body').removeClass('fix-overflow')
			}
		}
	})

	// FAQ dropdown
	$('.js-faq-dropdown').on('click', '.f-dropdown__head', function(e) {
		e.preventDefault();

		var $current = $(this).closest('.js-faq-dropdown'),
			$dd = $(this).next('.f-dropdown__dd');

		$('.js-faq-dropdown').not($current).removeClass('isOpened').find('.f-dropdown__dd').slideUp()

		$current.toggleClass('isOpened')
		$dd.slideToggle();
	})

	$(document).on('click', function (e) {
		if($(e.target).closest('.js-faq-dropdown').length === 0) {
			$('.js-faq-dropdown').removeClass('isOpened').find('.f-dropdown__dd').slideUp()
		}
	})

	// Feedback slider
	$('.js-feedback-slider').owlCarousel({
		items: 2,
		margin: 20,
		lazyLoad: true,
		autoWidth: true,
		responsive: {
			400: {
				items: 2,
				autoWidth: false
			},
			768: {
				items: 3,
				autoWidth: false
			},
			1024: {
				items: 4,
				autoWidth: false
			}
		}
	})

	//Popup carousels
	$('.js-p-main-carousel').owlCarousel({
		items: 1,
		lazyLoad: true,
	})

	//Scroll top
	$('.js-scroll-top').on('click', function(e) {
		e.preventDefault()

		$('html, body').animate({ scrollTop: 0 }, 500)
	})
});

//Fix top line
var topLine = {
	isInit: false,
	isVisible: false,
	$line: null,
	lineHeight: 0,
	oldScollValue: 0,
	init: function () {
		if (!this.isInit) {
			this.$line = $('.header')
			this.lineHeight = this.$line.outerHeight()

			$(window).on('scroll', this.handler.bind(this))
			this.isInit = true
		}
	},
	destroy: function () {
		if (this.isInit) {
			$(window).off('scroll', this.handler)

			this.fixed(false)
			this.$line.removeClass('show')
			this.isVisible = false
			this.oldScollValue = 0

			
			this.isInit = false
		}
	},
	handler: function () {
		var scrollTop = $(window).scrollTop();

		if (this.lineHeight < scrollTop && this.isInit) {
			this.fixed(true)

			if (this.oldScollValue > scrollTop && !this.isVisible) {
				this.$line.addClass('show')
				this.isVisible = true
			} else if (this.oldScollValue < scrollTop && this.isVisible) {
				this.$line.removeClass('show')
				this.isVisible = false
			}

			this.oldScollValue = scrollTop
		} else {
			this.fixed(false)
		}
	},
	fixed: function (flag) {
		if (flag) {
			this.$line.addClass('fixed')
			$('body').css('margin-top', this.lineHeight + 'px')

			setTimeout(function() {
				this.$line.addClass('animation')
			}.bind(this), 500)
		} else {
			this.$line.removeClass('fixed')
			this.$line.removeClass('animation')
			$('body').css('margin-top', 0 + 'px')
		}
	}
}

//Fix filters line
var filters = {
	isInit: false,
	$line: null,
	lineHeight: 0,
	lineOffsetTop: 0,
	init: function () {
		if (!this.isInit) {
			this.$line = $('.filters')
			this.lineHeight = this.$line.outerHeight()
			this.lineOffsetTop = this.$line.offset().top

			$(window).on('scroll', this.handler.bind(this))
			this.isInit = true
		}
	},
	destroy: function () {
		if (this.isInit) {
			this.handler()
			$(window).off('scroll', this.handler)
			this.isInit = false
		}
	},
	handler: function () {
		if (this.lineOffsetTop <= $(window).scrollTop() && this.isInit) {
			this.$line.addClass('fixed')
			$('body').css('margin-top', this.lineHeight + 'px')
		} else {
			this.$line.removeClass('fixed')
			$('body').css('margin-top', 0 + 'px')
		}
	}
}

$(window).on('load', function() {
	if (window.innerWidth > 1200) {
		filters.init();
	} else {
		topLine.init();
	}
	
})

$(window).on('resize', function() {
	if (window.innerWidth > 1200) {
		filters.init();
		topLine.destroy();
	} else {
		filters.destroy();
		topLine.init();
	}
})
