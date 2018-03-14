$(document).ready(function () {
    $('.history-nav button').each(function () {
        $(this).attr( 'data-nav','item-' + ($(this).index()+1));
    });
    $('.slideshow--2 .history-item').each(function () {
        $(this).attr( 'data-nav','item-' + ($(this).index()+1));
    });

    var indexAttr,
        currentState = 'normal';

    $('.history-nav button').click(function () {
        indexAttr = $(this).attr('data-nav');
        $('.slideshow--2 .history-item').removeClass('slide--current reverse normal');
        setTimeout(function () {
            if(currentState == 'normal') {
                $('.slideshow--2 .history-item[data-nav="'+ indexAttr +'"]').addClass('slide--current reverse');
                currentState = 'reverse';
            } else if (currentState == 'reverse') {
                $('.slideshow--2 .history-item[data-nav="'+ indexAttr +'"]').addClass('slide--current normal');
                currentState = 'normal';
            }
        },0);

    });

    $('.history').on( 'mousewheel DOMMouseScroll', function (e) {

        var e0 = e.originalEvent;
        var delta = e0.wheelDelta || -e0.detail;

        this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
        e.preventDefault();

        var $currentNav = $('.nav__item.nav__item--current');
        var $currentSlide = $('.history-item.slide--current');

        if(e.originalEvent.wheelDelta > 0) {
            // scroll up
            if($currentSlide.is('.normal')) {
                if($currentSlide.is(':first-child')) {
                    $currentNav.removeClass('nav__item--current');
                    $currentSlide.removeClass('slide--current normal');
                    $('.slideshow--2 .history-item').last().addClass('slide--current reverse');
                    $('.history-nav button').last().addClass('nav__item--current');
                } else {
                    $currentNav.removeClass('nav__item--current').prev('.nav__item').addClass('nav__item--current');
                    $currentSlide.removeClass('slide--current normal').prev('.history-item').addClass('slide--current reverse');
                }
            } else if($currentSlide.is('.reverse')) {
                if($currentSlide.is(':first-child')) {
                    $currentNav.removeClass('nav__item--current');
                    $currentSlide.removeClass('slide--current reverse');
                    $('.slideshow--2 .history-item').last().addClass('slide--current normal');
                    $('.history-nav button').last().addClass('nav__item--current');
                } else {
                    $currentNav.removeClass('nav__item--current').prev('.nav__item').addClass('nav__item--current');
                    $currentSlide.removeClass('slide--current reverse').prev('.history-item').addClass('slide--current normal');
                }
            }
        }
        else {
            // scroll down
            if($currentSlide.is('.normal')) {
                if($currentSlide.is(':last-child')) {
                    $currentNav.removeClass('nav__item--current');
                    $currentSlide.removeClass('slide--current normal');
                    $('.slideshow--2 .history-item').first().addClass('slide--current reverse');
                    $('.history-nav button').first().addClass('nav__item--current');
                } else {
                    $currentNav.removeClass('nav__item--current').next('.nav__item').addClass('nav__item--current');
                    $currentSlide.removeClass('slide--current normal').next('.history-item').addClass('slide--current reverse');
                }
            } else if($currentSlide.is('.reverse')) {
                if($currentSlide.is(':last-child')) {
                    $currentNav.removeClass('nav__item--current');
                    $currentSlide.removeClass('slide--current reverse');
                    $('.slideshow--2 .history-item').first().addClass('slide--current normal');
                    $('.history-nav button').first().addClass('nav__item--current');
                } else {
                    $currentNav.removeClass('nav__item--current').next('.nav__item').addClass('nav__item--current');
                    $currentSlide.removeClass('slide--current reverse').next('.history-item').addClass('slide--current normal');
                }
            }
        }


    });
});

/* history navigation */
;(function(window) {

    'use strict';

    function init() {
        [].slice.call(document.querySelectorAll('.history-nav')).forEach(function(nav) {
            var navItems = [].slice.call(nav.querySelectorAll('.nav__item')),
                itemsTotal = navItems.length,
                setCurrent = function(item) {
                    // return if already current
                    if( item.classList.contains('nav__item--current') ) {
                        return false;
                    }
                    // remove current
                    var currentItem = nav.querySelector('.nav__item--current');
                    currentItem.classList.remove('nav__item--current');

                    // set current
                    item.classList.add('nav__item--current');
                };

            navItems.forEach(function(item) {
                item.addEventListener('click', function() { setCurrent(item); });
            });
        });

        [].slice.call(document.querySelectorAll('.link-copy')).forEach(function(link) {
            link.setAttribute('data-clipboard-text', location.protocol + '//' + location.host + location.pathname + '#' + link.parentNode.id);
            new Clipboard(link);
            link.addEventListener('click', function() {
                link.classList.add('link-copy--animate');
                setTimeout(function() {
                    link.classList.remove('link-copy--animate');
                }, 300);
            });
        });
    }

    init();

})(window);