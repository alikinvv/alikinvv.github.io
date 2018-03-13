function mobileSlider() {
	$('.ink-main-slider').on( "swipeleft", function() {
		if($('.ink-main-slider .item:last-child()').hasClass('active')) {
			$(this).find('.item.active').removeClass('active');
			$('.ink-main-slider .item:first-child').addClass('active');
		} else {
			$(this).find('.item.active').removeClass('active').next('.item').addClass('active');
		}
	});

	$('.ink-main-slider').on( "swiperight", function() {
		if($('.ink-main-slider .item:first-child()').hasClass('active')) {
			$(this).find('.item.active').removeClass('active');
			$('.ink-main-slider .item:last-child').addClass('active');
		} else {
			$(this).find('.item.active').removeClass('active').prev('.item').addClass('active');
		}
	});
}

$(document).ready(function(){

	/* iphone top bar */
	if($(window).width() <= 359) {
		$('.address').css('width',$(window).width());
	}

	/* patriot table */
  $('.open-table').on('click', function () {
    if ($(window).outerWidth() > 1000) {
      $('.sticky').fixTo('#compare', {
        zIndex: 10
      });
    }
    $('.compare-test').animate({height: '100%'});
    $(this).hide();
    $('.compare-gradient').hide();
  });

  $('.spoiler-body').hide();
    $('.spoiler-body.count').show();

    $('.count td').on('click', function () {
        $('.count td').removeClass('active');
        $(this).addClass('active');
    })


    $('.spoiler-title').click(function () {
        $(this).next().slideToggle();
        $(this).toggleClass('collapsed');
    });

    $('thead td').click(function () {
        $('table td.active').removeClass('active');
        var th_num = $(this).index();
        $('table tr').each(function () {
            $(this).children('td').each(function (td_num) {
                if (td_num == th_num) {

                    $(this).addClass('active');
                }
            })
        })
    });

	/* mobile menu */
	if($(window).width() <= 1023) {
		if(!$('.menu').hasClass('mobile-menu')) {
			$('.menu').addClass('mobile-menu');
			$('.header').append('<a href="#" class="hamburger"><span class="line-1"></span><span class="line-2"></span></a>');
		}		
	} else {
		$('.menu').removeClass('mobile-menu');
		$('.hamburger').remove('.hamburger');
	}

  $('.hamburger').click(function() {
  	$(this).toggleClass('on');
  	$('.menu').toggleClass('open');
  	$('body, html').toggleClass('js-menu-open');
  }); 

	/* 'slider' */
	var text1 = 'Лизинг',
			text2 = 'Обмен',
			text3 = 'Утилизация',

			$item1 = $('.ink-slider .item-1'),
			$item2 = $('.ink-slider .item-2'),
			$item3 = $('.ink-slider .item-3');

	// right slide click
	$item3.click(function() {
		if ($item3.hasClass('img-3')) {
			$item1.removeClass('img-2').addClass('img-1');
			$item2.removeClass('img-1').addClass('img-3');
			$item3.removeClass('img-3').addClass('img-2');

			$item1.find('p').text(text2);
			$item2.find('p').text(text3);
			$item3.find('p').text(text1);

			$('.ink-main-slider .item').removeClass('active');
			$('.ink-main-slider .item-2').addClass('active');
		} else if ($item3.hasClass('img-2')) {
			$item1.removeClass('img-1').addClass('img-3');
			$item2.removeClass('img-3').addClass('img-2');
			$item3.removeClass('img-2').addClass('img-1');

			$item1.find('p').text(text3);
			$item2.find('p').text(text1);
			$item3.find('p').text(text2);

			$('.ink-main-slider .item').removeClass('active');
			$('.ink-main-slider .item-3').addClass('active');
		} else if ($item3.hasClass('img-1')) {
			$item1.removeClass('img-3').addClass('img-2');
			$item2.removeClass('img-2').addClass('img-1');
			$item3.removeClass('img-1').addClass('img-3');

			$item1.find('p').text(text1);
			$item2.find('p').text(text2);
			$item3.find('p').text(text3);

			$('.ink-main-slider .item').removeClass('active');
			$('.ink-main-slider .item-1').addClass('active');
		} 

	});

	// left slide click
	$item1.click(function() {
		if ($item1.hasClass('img-2')) {
			$item1.removeClass('img-2').addClass('img-3');
			$item2.removeClass('img-1').addClass('img-2');
			$item3.removeClass('img-3').addClass('img-1');

			$item1.find('p').text(text3);
			$item2.find('p').text(text1);
			$item3.find('p').text(text2);

			$('.ink-main-slider .item').removeClass('active');
			$('.ink-main-slider .item-3').addClass('active');
		} else if ($item1.hasClass('img-3')) {
			$item1.removeClass('img-3').addClass('img-1');
			$item2.removeClass('img-2').addClass('img-3');
			$item3.removeClass('img-1').addClass('img-2');

			$item1.find('p').text(text2);
			$item2.find('p').text(text3);
			$item3.find('p').text(text1);

			$('.ink-main-slider .item').removeClass('active');
			$('.ink-main-slider .item-2').addClass('active');
		} else if ($item1.hasClass('img-1')) {
			$item1.removeClass('img-1').addClass('img-2');
			$item2.removeClass('img-3').addClass('img-1');
			$item3.removeClass('img-2').addClass('img-3');

			$item1.find('p').text(text1);
			$item2.find('p').text(text2);
			$item3.find('p').text(text3);

			$('.ink-main-slider .item').removeClass('active');
			$('.ink-main-slider .item-1').addClass('active');
		} 
		
	});

	$(window).width() <= 767 ? mobileSlider() : '';


	/* sliders */
	$('.feat-slider').slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true
	});
	$('.feat-desc-slider').slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true
	});
	$('.feat-nav-slider').slick({
		infinite: false,
		slidesToShow: 6,
		slidesToScroll: 1,
		variableWidth: true,
		arrows: false,
		fade: true,
		asNavFor: '.feat-slider, .feat-desc-slider',
	 	focusOnSelect: true
	});

	$('.gallery').slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		centerMode: true,
		variableWidth: true,
		asNavFor: '.gallery-nav'
	});
	$('.gallery-nav').slick({
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		arrows: false,
		centerMode: true,
		variableWidth: true,
		asNavFor: '.gallery',
		focusOnSelect: true
	});

	/* animation */
	$("svg .lens").bind("webkitAnimationEnd mozAnimationEnd animationEnd", function(){
		$(this).removeClass("animate");
	})
	$(".tour a").hover(function(){
		$(".tour .lens").addClass("animate");
	})

	$(".header .icon-phone").bind("webkitAnimationEnd mozAnimationEnd animationEnd", function(){
		$(this).removeClass("animate");
	})
	$(".header .phone a").hover(function(){		
		$(this).find('.icon-phone').addClass("animate");        
	})

	/* tabs animation bar */
	$('.nav-tabs').append("<span class='bar'></span>");
	var $bar = $('.nav-tabs .bar');
	var barLeft =  $('.nav-tabs li.active').position().left;
	var barWidth = $('.nav-tabs li.active').width();
	$bar.css('width', barWidth).css('left', barLeft);

	$('.nav-tabs li').hover(function() {
		$bar.css('width', $(this).width()).css('left', $(this).position().left);
		$('.nav-tabs li.active').addClass('hover');
	});
	$('.nav-tabs').mouseleave(function() {
		$bar.css('width', barWidth).css('left', barLeft);
		$('.nav-tabs li.active').removeClass('hover');
	});
	$('.nav-tabs li').click(function() {
		barLeft =  $(this).position().left;
		barWidth = $(this).width();
	});

	/* color choice */
	$('.colors .item').click(function() {
		$('.colors .item').removeClass('active');
		$(this).addClass('active');
		var colorIndex = $(this).index();
		$('.color-car img').removeClass('active');
		$('.color-car img').eq(colorIndex).addClass('active');
	});
	
});

$(window).resize(function() {
	if($(window).width() <= 1023) {
		if(!$('.menu').hasClass('mobile-menu')) {
			$('.menu').addClass('mobile-menu');
			$('.header').append('<a href="#" class="hamburger"><span class="line-1"></span><span class="line-2"></span></a>');
		}	
	} else {
		$('.menu').removeClass('mobile-menu');
		$('.hamburger').remove('.hamburger');
	}

	/* iphone top bar */
	if($(window).width() <= 359) {
		$('.address').css('width',$(window).width());
	}

	$(window).width() <= 767 ? mobileSlider() : '';
});

$(document).bind('pageinit', function(event){
    $('.ui-link').removeClass('ui-link');
});