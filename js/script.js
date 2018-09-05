$(document).ready(function(){

    //ready

    //nojs
    $('body').removeClass('no-js');

    //------------------------------------------------------------------------//

    if ( $('.template-home').length ) {

        $('#fullpage').fullpage({
            anchors: ['Careers', 'Internships', 'Find_a_job', 'Education_and_development', 'People', 'Values'],
            'navigation': false,
            scrollOverflow: true,
            menu: '#home-menu',
            css3: false,
            responsiveWidth: 767,
            keyboardScrolling: false,
            continuousVertical:true,
        });

    }

    $('#moveSectionDown').click(function(e){
        e.preventDefault();
        $.fn.fullpage.moveSectionDown();
    });

    // var fullPageResize = function(){
    //     var docWidth = $('body').innerWidth();
    //     if ( docWidth < 1239 ) {
    //         $.fn.fullpage.destroy('all');
    //     } else {
    //         $.fn.fullpage.reBuild();
    //     }
    // }
    // fullPageResize();
    // $(window).resize(function() {
    //     fullPageResize();
    // });

    //------------------------------------------------------------------------//

    //fakelink
    $('a[href="#"]').on('click', function(event) {
        event.preventDefault();
    });

    //------------------------------------------------------------------------//

    //placeholder
    $('input[placeholder], textarea[placeholder]').placeholder();

    //------------------------------------------------------------------------//

    $(window).scroll(function(event){
		if (location.href.indexOf('people-') < 0) fromTop();
    });

    function fromTop() {
        if ( $(window).scrollTop() > 22 ) {
            $('header').addClass('from-top');
        } else {
            $('header').removeClass('from-top');
        }
    }

    //------------------------------------------------------------------------//

    //ripple
    $(".button").on('click', function(event) {
        $(".ripple").remove();
        var posX = $(this).offset().left,
            posY = $(this).offset().top,
            buttonWidth = $(this).width(),
            buttonHeight =  $(this).height();
        $(this).prepend("<span class='ripple'></span>");
        if( buttonWidth >= buttonHeight ) {
            buttonHeight = buttonWidth;
        } else {
            buttonWidth = buttonHeight;
        }
        var x = event.pageX - posX - buttonWidth / 2;
        var y = event.pageY - posY - buttonHeight / 2;
        $(".ripple").css({
            width: buttonWidth,
            height: buttonHeight,
            top: y + 'px',
            left: x + 'px'
        }).addClass("rippleEffect");
    });

    //------------------------------------------------------------------------//

    //scroll link
    $('a.scroll-link').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 71
                }, 500);
                return false;
            }
        }
    });

    //------------------------------------------------------------------------//

    $('.navigation-toggle').on('click', function(event) {
        event.preventDefault();
        $('body').toggleClass('navigation-open');
    });

    $('.home-menu a').on('click', function(event) {
        $('body').removeClass('navigation-open');
    });

    //------------------------------------------------------------------------//

    $('header').waypoint(function() {
        $(this).addClass('animated').addClass('fadeInDown').addClass('visibility-visible');
    }, {
        offset: "80%"
    });


    $('.title, .spanning, .scope-title-bg, .scope-title').waypoint(function() {
        $(this).addClass('animated').addClass('fadeIn').addClass('visibility-visible');
    }, {
        offset: "80%"
    });

    var mapAnimateOnce = false;
    $('.map-info-after').waypoint(function() {
        $(this).addClass('animated').addClass('fadeIn').addClass('visibility-visible');
        if ( !mapAnimateOnce ) {
            mapAnimateOnce = true;
            obt1 = new Vivus('map-lines', {type: 'sync', start: 'manual', duration: 700});
            obt1.play();
        }
    }, {
        offset: "80%"
    });

    $('.intro, .scope-slider-wrapper').waypoint(function() {
        $(this).addClass('animated').addClass('fadeInUp').addClass('visibility-visible');
    }, {
        offset: "90%"
    });

    $('.evolution-sidebar-right, .evolution-text-block').waypoint(function() {
        $(this).addClass('animated').addClass('fadeInRight').addClass('visibility-visible');
    }, {
        offset: "80%"
    });

    $('#home-menu, .way, .map').waypoint(function() {
        $(this).addClass('animated').addClass('fadeIn').addClass('visibility-visible');
    }, {
        offset: "80%"
    });

    $('.evolution-image, .evolution-sidebar-left, .way-chat').waypoint(function() {
        $(this).addClass('animated').addClass('fadeInLeft').addClass('visibility-visible');
    }, {
        offset: "80%"
    });

    $('.template-inner footer .container-fluid').waypoint(function() {
        $(this).addClass('animated').addClass('fadeIn').addClass('visibility-visible');
    }, {
        offset: "99%"
    });

    $('.template-home footer .container-fluid').waypoint(function() {
        $(this).addClass('animated').addClass('fadeInUp').addClass('visibility-visible');
    }, {
        offset: "100%"
    });

    //------------------------------------------------------------------------//

    //slider
    $('.scope-slider').slick({
        dots: true,
        arrows: false,
        draggable: true,
        infinite: true,
        centerMode: false,
        centerPadding: '0px',
        autoplay: false,
        autoplaySpeed: 5000,
        speed: 500,
        pauseOnHover: false,
        pauseOnDotsHover: false,
        slide: '.scope-item',
        slidesToShow: 4,
        slidesToScroll: 1,
        //rows: 2,
        //asNavFor: '',
        //fade: true
        responsive: [
            {
              breakpoint: 1199,
              settings: {
                slidesToShow: 2,
                slidesToScroll:2 ,
              }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToScroll:1 ,
                slidesToShow: 1
              }
            }
          ]
    });

    //slider
    $('.extend-slider').slick({
		dots: false,
        arrows: false,
        draggable: true,
        infinite: true,
        centerMode: false,
        centerPadding: '0px',
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 500,
        pauseOnHover: false,
        pauseOnDotsHover: false,
        slide: '.extend-slider-item',
        slidesToShow: 1,
        slidesToScroll: 1,
        //asNavFor: '',
        fade: false
    });

    $('.evo-custom-right').on('click', function(event) {
        event.preventDefault();
        $('.extend-slider').slick('slickNext');
    });

    $('.evo-custom-left').on('click', function(event) {
        event.preventDefault();
        $('.extend-slider').slick('slickPrev');
    });

    //------------------------------------------------------------------------//

    //slider
    $('.mobile-steps-slider').slick({
        dots: false,
        arrows: false,
        draggable: true,
        infinite: true,
        centerMode: false,
        centerPadding: '0px',
        autoplay: false,
        autoplaySpeed: 5000,
        speed: 500,
        pauseOnHover: false,
        pauseOnDotsHover: false,
        slide: '.mobile-steps-slide',
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.mobile-steps-slider-nav',
        fade: true
    });
    //slider
    $('.mobile-steps-slider-nav').slick({
        dots: false,
        arrows: true,
        draggable: true,
        infinite: false,
        centerMode: true,
        centerPadding: '0px',
        autoplay: false,
        autoplaySpeed: 5000,
        speed: 500,
        pauseOnHover: false,
        pauseOnDotsHover: false,
        slide: '.mobile-steps-slide-nav',
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.mobile-steps-slider',
        //fade: true
    });

    //------------------------------------------------------------------------//

    $('.career-image-drop-all-link').on('click', function(event) {
        event.preventDefault();
        $('.career-drop').removeClass('active');
        $(this).parents('.career-block').find('.career-drop').addClass('active');
    });

    //------------------------------------------------------------------------//

    $('.hobbies-catalog .hobbie').on('click', function(event) {
        window.location = $(this).find('.hobbie-hidden-link').attr("href");
        return false;
    });

    //------------------------------------------------------------------------//

    $('.vacancy-card').on('click', function() {
        var indexModal = $(this).attr('data-vacancy');
        var thisModal = $('.vacancy-modal-wrap').children().eq(indexModal);
        thisModal.fadeIn().addClass('modal-active');
        $('html').css('overflow-y', 'hidden');
        if ( $('.vacancy-modal').hasClass('modal-active') ) {
            $('.vacancy-modal').on('scroll', function() {  
                if ( $(this).scrollTop() > thisModal.children('.vacancy-modal-title').height() ) {
                    $('.vacancy-modal-close').addClass('vacancy-modal-fixed');
                } else {
                    $('.vacancy-modal-close').removeClass('vacancy-modal-fixed');
                }
            });
        };
        
    });    

    $('.vacancy-modal-close').on('click', function() {
        $('.vacancy-modal').fadeOut();
        $('html').css('overflow-y', 'visible');
    });


    //------------------------------------------------------------------------//



});//document ready

//*********************************************************************//

$(window).load(function() {

    //load
        $("#fittext1").fitText(0.56);
        $("#fittext2").fitText(0.50);
        $("#fittext3").fitText(0.69);
        $("#fittext4").fitText(0.63);
        $("#fittext5").fitText(0.59);
        $("#fittext6").fitText(0.79);

    var mapAnimateOnceWay = false;
    $('.way').waypoint(function() {
        $('.way-dot-img, .way-block-step').addClass('animated').addClass('fadeIn').addClass('visibility-visible');
        if ( !mapAnimateOnceWay ) {
            mapAnimateOnceWay = true;
            obt2 = new Vivus('way-svg', {type: 'sync', start: 'manual', selfDestroy: true, duration: 100});
            obt2.play();
        }
    }, {
        offset: "80%"
    });

});//window load

//*********************************************************************//

$(window).resize(function() {

    //resize

});//window resize