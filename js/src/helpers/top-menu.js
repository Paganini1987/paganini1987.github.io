import * as touchDetect from './touch-detect'

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

$(window).on('load', function() {
	if (window.innerWidth < 1200) {
		topLine.init();
	}
	
})

$(window).on('resize', function() {
	if (window.innerWidth > 1200) {
		topLine.destroy();
	} else {
		topLine.init();
	}
})
