$(document).ready(function () {
    $('.review').slick({
        slidesToShow: 1,
        infinite: true,
        lazyLoad: 'ondemand',
        dots: false,
        arrows: true,
    });

    $('.usage-slick').slick({
        slidesToShow: 1,
        autoplay: true,
        infinite: true,
        arrow: true,
        lazyLoad: 'ondemand',
        dots: false
    });

    /* SPOILER */
    $('.requisites').on('click', function (e) {
        e.preventDefault();
        $('.requisites-body').slideToggle();
    })

    /* MAIN MENU */
    var activeNav = $('.main-nav a.active').text();

    $('.main-nav').hover( function () {
        $('.main-nav a').removeClass('active');
    });
    if($('.main-nav a').hasClass('active')) {
        $('.main-nav').mouseleave(function () {
            $('.main-nav a:contains('+activeNav+')').addClass('active');
        })
    }

    /* POSITION */

    var $body = $('body');
    var windowWidth = $(window).outerWidth();

    // if($('div').is('.title-info')) {
    //     if ( windowWidth >= 1400 ) {
    //         $('.title-info').css('left', $('.main-title .diagonal').offset().left + 30 + 'px').css('top', $('.main-title .diagonal').offset().top - 130 + 'px');
    //     } else {
    //         $('.title-info').css('left', $('.main-title .diagonal').offset().left + 230 + 'px').css('top', $('.main-title .diagonal').offset().top - 130 + 'px');
    //     }
    // }

    /* HISTORY POSITION */
    if($('p').is('.st1')) {
        $('p.st1').css('left', $('circle.st1').offset().left - 30 + 'px').css('top', $('circle.st1').offset().top - 190 + 'px');
        $('div.st1').css('left', $('circle.st1').offset().left + 14 + 'px').css('top', $('circle.st1').offset().top - 107 + 'px');

        $('p.st2').css('left', $('circle.st2').offset().left - 96 + 'px').css('top', $('circle.st2').offset().top - 190 + 'px');
        $('div.st2').css('left', $('circle.st2').offset().left + 14 + 'px').css('top', $('circle.st2').offset().top - 107 + 'px');

        $('p.st3').css('left', $('circle.st3').offset().left - 96 + 'px').css('top', $('circle.st3').offset().top - 190 + 'px');
        $('div.st3').css('left', $('circle.st3').offset().left + 14 + 'px').css('top', $('circle.st3').offset().top - 107 + 'px');

        $('p.st4').css('left', $('circle.st4').offset().left - 96+47 + 'px').css('top', $('circle.st4').offset().top - 190 + 'px');
        $('div.st4').css('left', $('circle.st4').offset().left + 14 + 'px').css('top', $('circle.st4').offset().top - 107 + 'px');
    }

    /* SCROLL SLIDER */


    var step = 25;
    var scrolling = false;

    $(".scrollLeft").bind("click", function(event) {
        event.preventDefault();
        // Animates the scrollTop property by the specified
        // step.
        $(".g-scroll").animate({
            scrollLeft: "-=" + step + "px"
        });
    }).bind("mouseover", function(event) {
        scrolling = true;
        scrollContent("left");
    }).bind("mouseout", function(event) {
        scrolling = false;
    });


    $(".scrollRight").bind("click", function(event) {
        event.preventDefault();
        $(".g-scroll").animate({
            scrollRight: "+=" + step + "px"
        });
    }).bind("mouseover", function(event) {
        scrolling = true;
        scrollContent("right");
    }).bind("mouseout", function(event) {
        scrolling = false;
    });

    function scrollContent(direction) {
        var amount = (direction === "left" ? "-=10px" : "+=10px");
        $(".g-scroll").animate({
            scrollLeft: amount
        },1, function() {
            if (scrolling) {
                scrollContent(direction);
            }
        });
    }

    /* DIAGONAL SLIDER */

    if ( windowWidth <= 1400 ) {
        $('svg image').attr('x','-50%');
    }

    /* MAIN SLIDER */

    var TIMEOUT = 6000;
    var interval = setInterval(handleNext, TIMEOUT);

    function handleNext() {
        var $radios = $('input[class*="slide-radio"]');
        var $activeRadio = $('input[class*="slide-radio"]:checked');
        var currentIndex = $activeRadio.index();
        var radiosLength = $radios.length;

        $radios.attr('checked', false);

        if (currentIndex >= radiosLength - 1) {
            $radios.first().attr('checked', true);
        } else {
            $activeRadio.next('input[class*="slide-radio"]').attr('checked', true);
        }
    }

});


$(window).resize(function () {

    var $body = $('body');
    var windowWidth = $(window).outerWidth();

    if($('div').is('.title-info')) {
        if ( windowWidth >= 1400 ) {
            $('.title-info').css('left', $('.main-title .diagonal').offset().left + 130 + 'px').css('top', $('.main-title .diagonal').offset().top - 130 + 'px');
        } else {
            $('.title-info').css('left', $('.main-title .diagonal').offset().left + 230 + 'px').css('top', $('.main-title .diagonal').offset().top - 130 + 'px');
        }
    }

    /* HISTORY POSITION */
    if($('p').is('.st1')) {
        $('p.st1').css('left', $('circle.st1').offset().left - 30 + 'px').css('top', $('circle.st1').offset().top - 190 + 'px');
        $('div.st1').css('left', $('circle.st1').offset().left + 14 + 'px').css('top', $('circle.st1').offset().top - 107 + 'px');

        $('p.st2').css('left', $('circle.st2').offset().left - 96 + 'px').css('top', $('circle.st2').offset().top - 190 + 'px');
        $('div.st2').css('left', $('circle.st2').offset().left + 14 + 'px').css('top', $('circle.st2').offset().top - 107 + 'px');

        $('p.st3').css('left', $('circle.st3').offset().left - 96 + 'px').css('top', $('circle.st3').offset().top - 190 + 'px');
        $('div.st3').css('left', $('circle.st3').offset().left + 14 + 'px').css('top', $('circle.st3').offset().top - 107 + 'px');

        $('p.st4').css('left', $('circle.st4').offset().left - 96+47 + 'px').css('top', $('circle.st4').offset().top - 190 + 'px');
        $('div.st4').css('left', $('circle.st4').offset().left + 14 + 'px').css('top', $('circle.st4').offset().top - 107 + 'px');
    }

    /* DIAGONAL SLIDER */

    if ( windowWidth <= 1400 ) {
        $('svg image').attr('x','-50%');
    }
})