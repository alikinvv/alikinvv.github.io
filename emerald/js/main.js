$(document).ready(function(){

    /* mobile menu */
    if ($('body').width() < 1024) {
        $('.main-nav').addClass('mobile');
    } else {
        $('.main-nav').removeClass('mobile');
    }

    $('.hm a').click(function(e){
        e.preventDefault();
        $('.menu-trigger').toggle();
        $('.hm').toggleClass('round');
        $('.menu-close').toggleClass('active');
        $('.drop-down').toggleClass('down');
        $('.main-nav.mobile').toggleClass('active');
        $("html,body").toggleClass('overflow');
    });

    $('.main-nav.mobile a').click(function () {
        console.log('active');
       $('.main-nav.mobile').removeClass('active');
        $('.hm').toggleClass('round');
        $('.menu-trigger').toggle();
        $('.menu-close').toggleClass('active');
        $("html,body").toggleClass('overflow');
    });

    /* spoilers */
    $('.spoiler-body').hide();
    $('.spoiler-title.opened + .spoiler-body').show();
    $('.spoiler-title').click(function(){
    $(this).toggleClass('opened').toggleClass('closed').next().slideToggle();
    var $thisArrow = $(this).find('button.arrow-button');
    if (!$($thisArrow).hasClass("up") && !$($thisArrow).hasClass("down")) {
        $($thisArrow).addClass("up");
    }
    else {
        $($thisArrow).toggleClass("up down");
    }
    });

    /* waypoints */
    var waypoint = new Waypoint({
        element: document.getElementById('comfort'),
        handler: function(direction) {
            console.log('Scrolled to waypoint!')
            $('.comfort').addClass('active');
        },
        offset: 200 
    })

    /* sticky elements */
    if($(window).width() >= 1280) {
        $(".main-nav").sticky({topSpacing:0});
        $(".sticky-emerald").sticky({topSpacing: $(window).height() - 170});
    }

    /* main slider height */
    if($(window).width() >= 1024) {
        $('.main-slider .item').height($(window).height() - $('header').outerHeight() - $('.main-nav').outerHeight());
    }    

    /* sliders */
    $('.main-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true
    });
    
    $('.dots-slider').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        fade: true
    });

    $('.plan-slider').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        customPaging: function(slider, i) { 
            // this example would render "tabs" with titles
            return '<div class="btn-wrap"><button class="tab">' + $(slider.$slides[i]).find('.dot-title').html() + '</button></div>';
        },
        fade: true
    });

    $('.main-news').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.nav-news',
        draggable: false
    });
    $('.nav-news').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.main-news',
        dots: false,
        centerMode: false,
        focusOnSelect: true,
        draggable: false
    });

});

$(window).resize(function() {
    /* main slider height */
    $('.main-slider .item').height($(window).height() - $('header').outerHeight() - $('.main-nav').outerHeight());
});

ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
        center: [58.005748, 56.272354],
        zoom: 16
    }, {
        searchControlProvider: 'yandex#search'
    }),

    cart1 = new ymaps.Placemark([58.005705, 56.283454],{},{
        iconLayout: 'default#imageWithContent',
        iconImageHref: '/img/icons/color-cart.svg',
        iconImageSize: [48, 48],
        iconImageOffset: [-24, -24],
    });

    myMap.geoObjects
        .add(new ymaps.Placemark([58.006121, 56.273181], {}, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/img/icons/color-cart.svg',
            iconImageSize: [48, 48],
            iconImageOffset: [-24, -24],
        }))
        .add(new ymaps.Placemark([58.006398, 56.270057], {}, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/img/icons/color-cart.svg',
            iconImageSize: [48, 48],
            iconImageOffset: [-24, -24],
        }))
        .add(new ymaps.Placemark([58.006619, 56.267805], {}, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/img/icons/color-cart.svg',
            iconImageSize: [48, 48],
            iconImageOffset: [-24, -24],
        }))
        .add(new ymaps.Placemark([58.006953, 56.259661], {}, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/img/icons/color-cart.svg',
            iconImageSize: [48, 48],
            iconImageOffset: [-24, -24],
        }))
        .add(new ymaps.Placemark([58.005644, 56.267300], {}, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/img/icons/color-cart.svg',
            iconImageSize: [48, 48],
            iconImageOffset: [-24, -24],
        }))
        .add(new ymaps.Placemark([58.005011, 56.275797], {}, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/img/icons/color-magnit.svg',
            iconImageSize: [48, 48],
            iconImageOffset: [-24, -24],
        }))
        .add(new ymaps.Placemark([58.008206, 56.286588], {}, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/img/icons/color-magnit.svg',
            iconImageSize: [48, 48],
            iconImageOffset: [-24, -24],
        }))
        .add(new ymaps.Placemark([58.005074, 56.274732], {}, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/img/icons/color-cart.svg',
            iconImageSize: [48, 48],
            iconImageOffset: [-24, -24],
        }))
        .add(new ymaps.Placemark([58.004907, 56.276907], {}, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/img/icons/color-ruble.svg',
            iconImageSize: [48, 48],
            iconImageOffset: [-24, -24],
        }))
        .add(new ymaps.Placemark([58.005182, 56.273316], {}, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/img/icons/color-ruble.svg',
            iconImageSize: [48, 48],
            iconImageOffset: [-24, -24],
        }))
        .add(new ymaps.Placemark([58.006591, 56.273692], {}, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/img/icons/color-ruble.svg',
            iconImageSize: [48, 48],
            iconImageOffset: [-24, -24],
        }))
        .add(new ymaps.Placemark([58.005124, 56.274136], {}, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/img/icons/color-plus.svg',
            iconImageSize: [48, 48],
            iconImageOffset: [-24, -24],
        }))
        .add(new ymaps.Placemark([58.005287, 56.271550], {}, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/img/icons/color-plus.svg',
            iconImageSize: [48, 48],
            iconImageOffset: [-24, -24],
        }))
        .add(new ymaps.Placemark([58.004299, 56.267959], {}, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/img/icons/color-plus.svg',
            iconImageSize: [48, 48],
            iconImageOffset: [-24, -24],
        }))
        .add(new ymaps.Placemark([58.005543, 56.265736], {}, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/img/icons/color-plus.svg',
            iconImageSize: [48, 48],
            iconImageOffset: [-24, -24],
        }))
        .add(new ymaps.Placemark([58.006593, 56.267042], {}, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/img/icons/color-plus.svg',
            iconImageSize: [48, 48],
            iconImageOffset: [-24, -24],
        }))
        .add(new ymaps.Placemark([58.006258, 56.272409], {}, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/img/icons/color-plus.svg',
            iconImageSize: [48, 48],
            iconImageOffset: [-24, -24],
        }))
        .add(new ymaps.Placemark([58.006916, 56.276277], {}, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/img/icons/color-letters.svg',
            iconImageSize: [48, 48],
            iconImageOffset: [-24, -24],
        }))
        .add(new ymaps.Placemark([58.007894, 56.271728], {}, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/img/icons/color-letters.svg',
            iconImageSize: [48, 48],
            iconImageOffset: [-24, -24],
        }))
        .add(new ymaps.Placemark([58.008641, 56.265717], {}, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/img/icons/color-school.svg',
            iconImageSize: [48, 48],
            iconImageOffset: [-24, -24],
        }))
        .add(new ymaps.Placemark([58.003442, 56.270408], {}, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/img/icons/color-school.svg',
            iconImageSize: [48, 48],
            iconImageOffset: [-24, -24],
        }))
        .add(new ymaps.Placemark([58.004979, 56.279836], {}, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/img/logo-diamond.svg',
            iconImageSize: [76, 76],
            iconImageOffset: [-38, -48],
        }))
        .add(new ymaps.Placemark([58.005601, 56.286303], {}, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/img/icons/color-7.svg',
            iconImageSize: [48, 48],
            iconImageOffset: [-24, -24],
        }))
        .add(new ymaps.Placemark([58.003567, 56.266895], {}, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/img/icons/color-body.png',
            iconImageSize: [54, 54],
            iconImageOffset: [-24, -24],
        }))
        .add(new ymaps.Placemark([58.007363, 56.261159], {}, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/img/icons/color-7g.svg',
            iconImageSize: [63, 63],
            iconImageOffset: [-24, -24],
        }))
        .add(new ymaps.Placemark([58.005705, 56.283454], {}, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/img/icons/color-cart.svg',
            iconImageSize: [48, 48],
            iconImageOffset: [-24, -24],
        }));

        myMap.behaviors.disable('scrollZoom'); 

        var footerMap = new ymaps.Map('map-footer', {
            center: [58.005833, 56.283574],
            zoom: 16
        }, {
            searchControlProvider: 'yandex#search'
        }),

        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(

        ),

        myPlacemark = new ymaps.Placemark(footerMap.getCenter(), {

        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: '/img/icons/marker.svg',
            // Размеры метки.
            iconImageSize: [33, 44],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-5, -38]
        }),

        myPlacemarkWithContent = new ymaps.Placemark([55.661574, 37.573856], {
            hintContent: 'Собственный значок метки с контентом',
            balloonContent: 'А эта — новогодняя',
            iconContent: '12'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            iconImageHref: 'images/ball.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [15, 15],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        });

    footerMap.geoObjects
        .add(myPlacemark)
        .add(myPlacemarkWithContent);
});
