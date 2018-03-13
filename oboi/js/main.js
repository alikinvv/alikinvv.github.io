$( document ).ready(function() {


    $(".fancybox").fancybox();

    /* ZOOM */
    /* http://zoomsl.sergeland.ru/ */
    $(".zoom").imagezoomsl({

        innerzoommagnifier: true,
        classmagnifier: window.external ? window.navigator.vendor === "Yandex" ? "" : "round-loupe" : "",
        magnifierborder: "5px solid #F0F0F0",                               // fix для Opera, Safary, Yandex
        zoomrange: [2, 8],
        zoomstart: 2,
        magnifiersize: [100, 100]
    });

    $(".zoom-inner").imagezoomsl({

        zoomrange: [1, 12],
        zoomstart: 2,
        innerzoom: true,
        magnifierborder: "none"
    });

    /* SLIDERS */

    $('.slick-main').slick({
        arrows: false,
        dots: true
    });

    $('.is-main').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        swipe: false,
        fade: true,
        asNavFor: '.is-nav'
    });
    $('.is-nav').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        asNavFor: '.is-main',
        arrows: true,
        swipe: false,
        dots: false,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4
                }
            }
        ]
    });

    $('.slick-reviews').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true
    });

    $('.ps-main').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        swipe: false,
        fade: true,
        asNavFor: '.ps-nav'
    });
    $('.ps-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        swipe: false,
        asNavFor: '.ps-main',
        arrows: true,
        dots: false,
        focusOnSelect: true
    });

    $('.others-slick').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        swipe: false,
        arrows: true,
        dots: false
    });

    /* MAIN NAVIGATION */

    window.addEventListener('load', function(){
        var movingBar = new MovingBar('.main-nav');
    });

    // .main-nav : Moving Bar
    function MovingBar( nav ){
        var $navMovingBar = document.querySelector( nav ),
            $btnMenu11 = $navMovingBar.querySelectorAll('a'),
            bar = document.createElement('span'),
            width, left;

        bar.classList.add('effect');
        $navMovingBar.appendChild( bar );

        for( var i=0, max=$btnMenu11.length; i<max; i++ ){
            $btnMenu11[i].addEventListener('mouseenter', function(){
                width = this.offsetWidth,
                    left = this.offsetLeft;
                barMovingCurrentMenu( width, left );
            });
        }

        var activeBarLeft = $('.main-nav li.active').offset().left;
        var activeBarWidth = $('.main-nav li.active').width();
        var spanEffect = $('span.effect');

        $(spanEffect).css('left',activeBarLeft-105+'px');
        // $(spanEffect).css('width',activeBarWidth+'px');
        /* delete active class with hover menu items*/
        $('.main-nav li').on('mouseover', function () {
            $('.main-nav li').removeClass('active');
        })

        function barMovingCurrentMenu( width, left ) {
            bar.style.width = width+20 + 'px';
            bar.style.left = left-10 + 'px';
        }
    }

    /* SELECT IN CATALOG */
    $(".custom-select").each(function() {
        var classes = $(this).attr("class"),
            id      = $(this).attr("id"),
            name    = $(this).attr("name");
        var template =  '<div class="' + classes + '">';
        template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
        template += '<div class="custom-options">';
        $(this).find("option").each(function() {
            template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
        });
        template += '</div></div>';

        $(this).wrap('<div class="custom-select-wrapper"></div>');
        $(this).hide();
        $(this).after(template);
    });
    $(".custom-option:first-of-type").hover(function() {
        $(this).parents(".custom-options").addClass("option-hover");
    }, function() {
        $(this).parents(".custom-options").removeClass("option-hover");
    });
    $(".custom-select-trigger").on("click", function() {
        $('html').one('click',function() {
            $(".custom-select").removeClass("opened");
        });
        $(this).parents(".custom-select").toggleClass("opened");
        event.stopPropagation();
    });
    $(".custom-option").on("click", function() {
        $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
        $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
        $(this).addClass("selection");
        $(this).parents(".custom-select").removeClass("opened");
        $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
    });

    var spanText;
    $('.custom-options span').on('click',function () {
        spanText = $(this).text();
        console.log(spanText);
        $(this).parent().parent().parent().find('select').find("option:contains('"+spanText+"')").attr('selected','selected');
        $(this).parent().parent().parent().find('select').change();
    })



});