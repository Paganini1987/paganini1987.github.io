document.addEventListener("DOMContentLoaded", function() {

	$('.js-main-slider').owlCarousel({
		items: 1,
		loop: true,
		nav: true,
		autoplay: true,
		autoplayHoverPause: true,
		smartSpeed: 500,
		mouseDrag: false,
		navText: ['<svg viewBox="0 0 9 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 1L1.57619 8.3415C1.24629 8.71852 1.24629 9.28148 1.57619 9.6585L8 17" stroke="white" stroke-width="2"/></svg>', '<svg viewBox="0 0 9 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 17L7.42381 9.6585C7.75371 9.28148 7.75371 8.71852 7.42381 8.3415L1 0.999999" stroke="white" stroke-width="2"/></svg>']
	})

	$('.js-go-to-top').on('click', function(e) {
		e.preventDefault()

		$('html, body').animate({ scrollTop: 0 }, 500)
	})

	$(window).on('scroll', function () {
		if ($(window).scrollTop() > $(window).innerHeight()/4) {
			$('.js-go-to-top').addClass('active')
		} else {
			$('.js-go-to-top').removeClass('active')
		}
	})

});
