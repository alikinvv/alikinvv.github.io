$(document).ready(function(){

    $('.slick').slick({
        arrows: false,
        dots: true
    });

    $('.slick-flowers').slick({
        infinite: true,
        centerMode: true,
        centerPadding: '0',
        slidesToShow: 3,
        arrows: true,
        dots: false
    });

    $('.slick-reviews').slick({
        slidesToShow: 1,
        arrows: true,
        dots: false
    });

    $('.spoiler-title').click(function(){
        $(this).next().slideToggle();
    });

    $('.spoiler-body').hide();
    $('.spoiler-body.spoiler-opened').show();

    $(".spoiler-title").click(function () {
        if (!$(this).find('.arrow-button').hasClass("up") && !$(this).find('.arrow-button').hasClass("down")) {
            $(this).find('.arrow-button').addClass("up");
        }
        else {
            $(this).find('.arrow-button').toggleClass("up down");
        }
        return false;
    });


});