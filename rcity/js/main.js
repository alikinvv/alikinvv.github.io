$(document).ready(function () {

    /* sliders init */

    var mySwiper = new Swiper ('.swiper-container', {
        loop: true,        
        nextButton: '.icon-arrow-right',
        prevButton: '.icon-arrow-left'
    });

    if($('body').width() >= 1400) {
        var mySwiper = new Swiper ('.swiper-carousel', {
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: -480,
            nextButton: '.icon-arrow-right',
            prevButton: '.icon-arrow-left'
        });
    } else if($('body').width() <= 1200) {
        var mySwiper = new Swiper ('.swiper-carousel', {
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: -140,
            nextButton: '.icon-arrow-right',
            prevButton: '.icon-arrow-left'
        });
    }  else {
        var mySwiper = new Swiper ('.swiper-carousel', {
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: -350,
            nextButton: '.icon-arrow-right',
            prevButton: '.icon-arrow-left'
        });
    }

    if($('#area').is('div')) {
        var slider = document.getElementById('area');

        noUiSlider.create(slider, {
            start: [6, 15],
            connect: true,
            tooltips: true,
            step: 1,
            range: {
                'min': 2,
                'max': 25
            },
            format: wNumb({
                decimals: 0,
                thousand: '.',
                postfix: ' соток',
            })
        });
    }

    if($('#count').is('div')) {
        var sliderCount = document.getElementById('count');

        noUiSlider.create(sliderCount, {
            start: [300000, 1000000],
            connect: true,
            tooltips: true,
            step: 100000,
            range: {
                'min': 100000,
                'max': 2000000
            },
            format: wNumb({
                decimals: 0,
                thousand: ' ',
                postfix: ' рублей',
            })
        });
    }

    $('.tool').click(function() {
        $(this).addClass('visible');
    });

    // $('body').click(function() {
    //     if($('.tool').is(':visible') && $('.tool').is('.visible')) {
    //         $('.tool').removeClass('visible');
    //     }
    // });
    
    /* main navigation */

    $('.menu').sticky({topSpacing:0});

    $(function () {

        var currentIndex = 0;
        var _offset = 10;

        var $menuLi = $(".menu li");
        var $line = $(".menu .menu-line");

        $menuLi.mouseover(function () {

            var _$this = $(this);

            TweenMax.killTweensOf($line);

            if (_$this.index() > currentIndex) {

                TweenMax.to($line, 0.5, {
                    css: {width: (_$this.position().left + _$this.outerWidth()) - $line.position().left + _offset / 2},
                    onComplete: function () {
                        currentIndex = _$this.index();
                        TweenMax.to($line, 0.5, {
                            css: {
                                left: _$this.position().left - _offset / 2,
                                width: _$this.outerWidth() + _offset
                            }
                        })
                    }
                });

            } else {

                TweenMax.to($line, 0.5, {
                    css: {
                        left: _$this.position().left - _offset / 2,
                        width: ($line.position().left + $line.outerWidth()) - _$this.position().left + _offset / 2
                    }, onComplete: function () {
                        currentIndex = _$this.index();
                        TweenMax.to($line, 0.5, {css: {width: _$this.outerWidth() + _offset}})
                    }
                });

            }

        });

        $('.menu').mouseleave(function () {
            if($('.menu li').is('.active')) {

            } else {
                $line.animate({
                    width: 0
                },500);
            }
        });

    });

});