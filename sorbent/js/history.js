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
//
// /* history */
//
// (function() {
//
//     // Body element.
//     var bodyEl = document.body;
//
//     var currentSl, indexAttr;
//
//     $('.history-nav button').click(function () {
//         indexAttr = $(this).attr('data-nav');
//         currentSl = $('.slideshow--2 .history-item[data-nav="'+ indexAttr +'"]');
//         console.log(currentSl);
//     });
//
//
//     // Slide obj: each Slideshow´s slide will contain the HTML element and the instance of TextFx.
//     var Slide = function(el) {
//             this.el = el;
//             this.txt = new TextFx(this.el.querySelector('.title'));
//         },
//     // The Slideshow obj.
//         Slideshow = function(el) {
//             this.el = el;
//             this.current = 0;
//             this.slides = [];
//             var self = this;
//             [].slice.call(this.el.querySelectorAll('.slide')).forEach(function(slide) {
//                 self.slides.push(new Slide(slide));
//             });
//             this.slidesTotal = this.slides.length;
//             this.effect = this.el.getAttribute('data-effect');
//         };
//
//     Slideshow.prototype._navigate = function(direction) {
//         if( this.isAnimating ) {
//             return false;
//         }
//         this.isAnimating = true;
//
//         var self = this, currentSlide = this.slides[this.current];
//
//         this.current = direction === 'next' ? (this.current < this.slidesTotal - 1 ? this.current + 1 : 0) : (this.current = this.current > 0 ? this.current - 1 : this.slidesTotal - 1);
//         var nextSlide = this.slides[this.current];
//
//
//         var checkEndCnt = 0, checkEnd = function() {
//             ++checkEndCnt;
//             if( checkEndCnt === 2 ) {
//                 currentSlide.el.classList.remove('slide--current');
//                 nextSlide.el.classList.add('slide--current');
//                 self.isAnimating = false;
//             }
//         };
//
//         // Call the TextFx hide method and pass the effect string defined in the data-effect attribute of the Slideshow element.
//         currentSlide.txt.hide(this.effect, function() {
//             currentSlide.el.style.opacity = 0;
//             checkEnd();
//         });
//         // First hide the next slide´s TextFx text.
//         nextSlide.txt.hide();
//         nextSlide.el.style.opacity = 1;
//
//         // And now call the TextFx show method.
//         nextSlide.txt.show(this.effect, function() {
//             checkEnd();
//         });
//     };
//
//     Slideshow.prototype.next = function() { this._navigate('next'); };
//
//     Slideshow.prototype.prev = function() { this._navigate('prev');	};
//
//     [].slice.call(document.querySelectorAll('.content')).forEach(function(currentSl, pos) {
//         var slideshow = new Slideshow(currentSl.querySelector('.slideshow'));
//         currentSl.querySelector('.actions').firstElementChild.addEventListener('click', function() { slideshow.prev(); });
//         currentSl.querySelector('.actions').lastElementChild.addEventListener('click', function() { slideshow.next(); });
//
//     });
//
//
// })();