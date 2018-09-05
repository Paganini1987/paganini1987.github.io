$(function() {
    //Открыть попап с видео
    $('.js-p-video-open').on('click', function(e){
        e.preventDefault();

        if (typeof $(this).data('video') != 'undefined') {
            $('#videoframe').attr('src', $(this).data('video'));
            $('body').addClass('p-video-show');
        } else {
            console.error('Отсутствует источник видео!');
        }
        
    })

    //Закрыть попап с видео
    $('.js-p-video-close').on('click', function (e) {
        e.preventDefault();

        //Остановить видео при закрытии окна
        $("iframe").each(function () {
            $(this)[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
        });
        $('body').removeClass('p-video-show');
    })
    $(document).on('click', function (e) {
        if ($(e.target).hasClass('p-video__wrapper')) {
            //Остановить видео при закрытии окна
            $("iframe").each(function () {
                $(this)[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
            });
            $('body').removeClass('p-video-show');
        }
    })

    //Анимации появления ценностей
    $('.value--1').waypoint(function () {
        $(this).addClass('animated').addClass('fadeInRight').addClass('visibility-visible');
    }, {
        offset: "80%"
    });
    $('.value--2').waypoint(function () {
        $(this).addClass('animated').addClass('fadeInLeft').addClass('visibility-visible');
    }, {
            offset: "80%"
    });
    $('.value--3').waypoint(function () {
        $(this).addClass('animated').addClass('fadeInRight').addClass('visibility-visible');
    }, {
            offset: "80%"
    });
    $('.value--4').waypoint(function () {
        $(this).addClass('animated').addClass('fadeInLeft').addClass('visibility-visible');
    }, {
        offset: "80%"
    });
})