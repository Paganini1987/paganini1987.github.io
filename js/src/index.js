import * as showcase from './_showcase'
import * as topMenu from './helpers/top-menu'
import * as touchDetect from './helpers/touch-detect'
import * as scrollTop from './helpers/scroll-top'

document.addEventListener("DOMContentLoaded", function() {
	

	// $(document).on('click', '.df-dropdown__head', function (e) {
	// 	e.preventDefault()

	// 	var $current = $(this).closest('.js-dropdown');

	// 	$('.js-dropdown').not($current).removeClass('isOpened')
	// 	$current.toggleClass('isOpened')
	// })
	// $(document).on('click', function (e) {
	// 	if($(e.target).closest('.js-dropdown').length === 0) {
	// 		$('.js-dropdown').removeClass('isOpened')
	// 	}
	// })

	// $('.js-switch').on('click', function(e) {
	// 	e.stopPropagation();

	// 	$(this).toggleClass('selected')
	// })

	// Open dish popup
	// $('.dish').on('click', function(e) {
	// 	e.preventDefault()

	// 	$('body').addClass('p-dish-opened')
	// 	$('body').addClass('fix-overflow')
	// })

	// Close dish popup
	// $('.js-close-dish-popup').on('click', function(e) {
	// 	e.preventDefault()

	// 	$('body').removeClass('p-dish-opened')
	// 	$('body').removeClass('fix-overflow')
	// })
	// $(document).on('click', function (e) {
	// 	if ($(e.target).closest('.df-popup__inner').length === 0 && $(e.target).closest('.dish').length === 0) {
	// 		if ($('body').hasClass('p-dish-opened')) {
	// 			$('body').removeClass('p-dish-opened')
	// 			$('body').removeClass('fix-overflow')
	// 		}
	// 	}
	// })

	//Open m-menu
	$('.js-m-menu-open').on('click', function (e) {
		e.preventDefault()

		$('body').addClass('m-menu-opened')
	})
	$('.js-m-menu-close').on('click', function (e) {
		e.preventDefault()

		$('body').removeClass('m-menu-opened')
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
});



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
		// filters.init();
	} else {
		// topLine.init();
	}
	
})

$(window).on('resize', function() {
	if (window.innerWidth > 1200) {
		// filters.init();
		// topLine.destroy();
	} else {
		// filters.destroy();
		// topLine.init();
	}
})
