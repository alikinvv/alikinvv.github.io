$(document).ready(function () {

    setTimeout(function () {
        $('.interactive .choice').fadeOut();
    },7000);

    var $interactive = $('.interactive'),
        $panelRight = $('.panel-right'),
        $buttonRight = $('.button-right'),
        $panelLeft = $('.panel-left'),
        $buttonLeft = $('.button-left');

    /* gradient move */
    $buttonLeft.mouseover(function () {
        $interactive.addClass('bgleft');
    });
    $buttonLeft.mouseout(function () {
        $interactive.removeClass('bgleft');
    });
    $buttonRight.mouseover(function () {
        $interactive.addClass('bgright');
    });
    $buttonRight.mouseout(function () {
        $interactive.removeClass('bgright');
    });

    /* panels slide */
    $('.panel-content img').hide();
    $buttonLeft.click(function () {
        if ($panelRight.hasClass('slide')) {
            $panelRight.removeClass('slide');
            $buttonLeft.removeClass('button-slide');
            $('.panel-content img').hide();
        } else if($panelLeft.hasClass('slide')) {
            $panelLeft.removeClass('slide');
            $buttonRight.removeClass('button-slide');
        } else {
            $panelLeft.addClass('slide');
            setTimeout(function () {
                $buttonRight.addClass('button-slide');
            }, 100);
            setTimeout(function () {
                $('.panel-content img').show();
            },400);
        }
    });

    $buttonRight.click(function () {
        if ($panelLeft.hasClass('slide')) {
            $panelLeft.removeClass('slide');
            $buttonRight.removeClass('button-slide');
            $('.panel-content img').hide();
        } else if ($panelRight.hasClass('slide')) {
            $panelRight.removeClass('slide');
            $buttonLeft.removeClass('button-slide');
        } else {
            $panelRight.addClass('slide');
            setTimeout(function () {
                $buttonLeft.addClass('button-slide');
            }, 100);
        }

    });

    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            $panelLeft.removeClass('slide');
            $panelRight.removeClass('slide');
            $buttonLeft.removeClass('button-slide');
            $buttonRight.removeClass('button-slide');
            $('.panel-content img').hide();
        }
    });

    /* panel paragraph vertical align */
    $('.panel-content p').each(function () {
        var height = $(this).height() / -2;
        $(this).css('margin-top', height);
    });

    /* search state */
    $('input[type="search"]').focus(function () {
        $(this).addClass('open');
        setTimeout(function () {
            $('.search .icon-top').addClass('slide');
        },200);
    });
    $('input[type="search"]').blur(function () {
        if($(this).val().length === 0) {
            $(this).removeClass('open');
            $('.search .icon-top').removeClass('slide');
        } else {
            $('.search .icon-top').css('pointer-events','initial');
        }
    });

    /* slides blocks */
    var nodes  = $('.slide-block > div '),
        _nodes = [].slice.call(nodes, 0);

    var getDirection = function (ev, obj) {
        var w = obj.offsetWidth,
            h = obj.offsetHeight,
            x = (ev.pageX - obj.offsetLeft - (w / 2) * (w > h ? (h / w) : 1)),
            y = (ev.pageY - obj.offsetTop - (h / 2) * (h > w ? (w / h) : 1)),
            d = Math.round( Math.atan2(y, x) / 1.57079633 + 5 ) % 4;

        return d;
    };
    var addClass = function ( ev, obj, state ) {
        var direction = getDirection( ev, obj ),
            class_suffix = "",
            per;

        obj.className = "";

        switch ( direction ) {
            case 0:
                class_suffix = '-top';
                per = 'y';
                break;
            case 1:
                class_suffix = '-right';
                per = 'x';
                break;
            case 2:
                class_suffix = '-bottom';
                per = 'y';
                break;
            case 3:
                class_suffix = '-left';
                per = 'x';
                break;
        }

        if(per == 'x') {
            $('.slide-block > div').each(function () {
                $(this).css('perspective',$(this).width()*2+'px').css('-webkit-perspective',$(this).width()*2+'px');
            });
        }
        if(per == 'y') {
            $('.slide-block > div').each(function () {
                $(this).css('perspective',$(this).height()*2+'px').css('-webkit-perspective',$(this).height()*2+'px');
            });
        }

        obj.classList.add( state + class_suffix );
    };

    _nodes.forEach(function (el) {
        el.addEventListener('mouseover', function (ev) {
            addClass( ev, this, 'in' );
        }, false);

        el.addEventListener('mouseout', function (ev) {
            addClass( ev, this, 'out' );
        }, false);
    });

    /* reviews slider */
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        lazyLoading: true
    });

    /* spoilers */
    var $spoilerToggle = $('.spoiler-toggle'),
        $spoilerBody = $('.spoiler-body');

    $spoilerToggle.on('click',function () {
       $(this).parent().find($spoilerBody).slideToggle();
        $(this).toggleClass('collapsed');
    });

    /* tight side block height */
    // $('.side-right').each(function(){
    //     var parentHeight = $(this).parent('.row').height();
    //     $(this).height(parentHeight);
    // });

    /* fixed elements on sidebar */
    $('.fixed:not(.no-fx)').fixTo('side-right', {
        top: 80
    });

    $('.fixed').on('sticky-end', function() { console.log("Started"); });

    /* button scroll top */
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 1000) {
                $('#scroll-top').addClass('visible');
            } else {
                $('#scroll-top').removeClass('visible');
            }
        });
        // scroll body to 0px on click
        $('#scroll-top').click(function (e) {
            e.preventDefault();
            $('body,html').animate({
                scrollTop: 0
            }, 800);
        });
    })

    /* loader */
    $(".loader .c").one('animationiteration webkitAnimationIteration', function() {
        $(this).removeClass("rotate").addClass('pinch');
        setTimeout(function () {
            $('.loader .c').hide();
        },150);
        $('.r, .l').addClass('line');
        setTimeout(function () {
            $('.r, .l').removeClass('line');
            setTimeout(function () {
                $('.r, .l').addClass('slide');
                setTimeout(function () {
                    $('.loader').remove();
                },700)
            },100)
        },500)
    });

    //
    // var el = document.getElementById("rotate");
    // var st = window.getComputedStyle(el, null);
    // var tr = st.getPropertyValue("-webkit-transform") ||
    //     st.getPropertyValue("-moz-transform") ||
    //     st.getPropertyValue("-ms-transform") ||
    //     st.getPropertyValue("-o-transform") ||
    //     st.getPropertyValue("transform") ||
    //     "FAIL";
    //
    // var values = tr.split('(')[1].split(')')[0].split(',');
    // var a = values[0];
    // var b = values[1];
    // var c = values[2];
    // var d = values[3];
    //
    // var scale = Math.sqrt(a*a + b*b);
    //
    // var sin = b/scale;
    // var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    //
    // console.log('Rotate: ' + angle + 'deg');
    //
    // if(angle >= 0 && angle <= 90) {
    //     $('.loader .c').addClass('to90');
    // } else if(angle >= 90 && angle <= 180) {
    //     $('.loader .c').addClass('to180');
    // } else if(angle >= 180 && angle <= 270) {
    //     $('.loader .c').addClass('to270');
    // } else if(angle >= 270 && angle <= 360) {
    //     $('.loader .c').addClass('to360');
    // }
    //
    // console.log(angle);


});

$(window).resize(function () {
    $('.panel-content p').each(function () {
        var height = $(this).height() / -2;
        $(this).css('margin-top', height);
    });
});