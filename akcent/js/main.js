(function($) {

    $.fn.fontFlex = function(min, max, mid) {

        var $this = this;

        $(window).resize(function() {

            var size = window.innerWidth / mid;

            if (size < min) size = min;
            if (size > max) size = max;

            $this.css('font-size', size + 'px');

        }).trigger('resize');
    };

})(jQuery);

$(document).ready(function(){
	$("#business").click(function() {
	    $('html, body').animate({
	        scrollTop: $("#businessD").offset().top - 200
	    }, 1500);
	});

	$("#handmade").click(function() {
	    $('html, body').animate({
	        scrollTop: $("#handmadeD").offset().top - 200
	    }, 1500);
	});

	$(function() {
		$("#typing-text").typed({
	      strings: [
	        "эмоций",
	        "радости",
	        "удовольствия",
	        "восторга",
	        "неожиданности",
	        "акцент"
	      ],
	      typeSpeed: 100,
	      backDelay: 2000,
	      loop: true,
	  });
	});

	var swiperMain = new Swiper('.main-slider', {
	  slidesPerView: 'auto',
	  spaceBetween: 30,
	  centeredSlides: true,
	  touchRatio: 0,
	  1023: {
		centeredSlides: false
	  },
	});


	$('.second-slider').each(function() {
		var el = $(this).attr('data-number');
		el = new Swiper('.second-slider[data-number="' + el + '"]', {
		  slidesPerView: 'auto',
		  centeredSlides: true,
		  scrollbar: {
		    el: '.swiper-scrollbar',
		    hide: false,
		  },		  
		  on: {
		  	slideNextTransitionEnd: function() {
				if($('.second-slider .swiper-slide:last-child').hasClass('swiper-slide-active')) {
				setTimeout(function() {
					swiperMain.slideNext();
				},500);
			  }
			},
			slidePrevTransitionEnd: function() {
				if($('.second-slider .swiper-slide:first-child').hasClass('swiper-slide-active')) {
				setTimeout(function() {
					swiperMain.slidePrev();
				},500);
			  }
			}
		  }
		});
		$(this).parent().find('.icon-arrow-right').click(function() {
			el.slideNext();
			if($('.second-slider .swiper-slide:last-child').hasClass('swiper-slide-active')) {
				setTimeout(function() {
					swiperMain.slideNext();
				},500);
			  }
		});
		$(this).parent().find('.icon-arrow-left').click(function() {
			el.slidePrev();
			if($('.second-slider .swiper-slide:first-child').hasClass('swiper-slide-active')) {
				setTimeout(function() {
					swiperMain.slidePrev();
				},500);
			  }
		});
	});

	$('.main-slider .swiper-slide').click(function() {
		var i = $(this).index();
		swiperMain.slideTo(i);
	});

	

	sameHeight('.cards .radio');

	$('.cards .radio').click(function (e) {
        var parentOffset = $(this).offset(); 
	   var relX = e.pageX - parentOffset.left;
	   var relY = e.pageY - parentOffset.top;
	   $('.cards .radio').removeClass('checked');
	   $('.cards .radio .circle').removeClass('animate').css('left','initial').css('top','initial');
        $(this).find('.circle').css('left',relX).css('top',relY).addClass('animate');
        $(this).addClass('checked');
    });

    $('.time .radio').click(function () {
    	$('.time .radio').removeClass('checked');
    	$(this).addClass('checked');
    });

    var slider = document.getElementById('range');

    var rangeMin = 0,
    	rangeMax = 5000;

	noUiSlider.create(slider, {
		start: [2500],
		connect: [true, false],
		range: {
			'min': rangeMin,
			'max': rangeMax
		},
		step: 10,
		pips: {
			mode: 'values',
			values: [rangeMin, rangeMax],
			density: rangeMax
		},
		format: wNumb({
	        decimals: 0
	    }),
	    tooltips: true

	});
	//set your google maps parameters
	var $latitude =  58.01639,
		$longitude = 56.250842,
		$map_zoom = 16;

	//google map custom marker icon - .png fallback for IE11
	var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
	
	//define the basic color of your map, plus a value for saturation and brightness
	var	$main_color = '#2d313f',
		$saturation= -100,
		$brightness= 5;

	//we define here the style of the map
	var style= [ 
		{
			//set saturation for the labels on the map
			elementType: "labels",
			stylers: [
				{saturation: $saturation}
			]
		},  
	    {	//poi stands for point of interest - don't show these lables on the map 
			featureType: "poi",
			elementType: "labels",
			stylers: [
				{visibility: "off"}
			]
		},
		{
			//don't show highways lables on the map
	        featureType: 'road.highway',
	        elementType: 'labels',
	        stylers: [
	            {visibility: "off"}
	        ]
	    }, 
		{ 	
			//don't show local road lables on the map
			featureType: "road.local", 
			elementType: "labels.icon", 
			stylers: [
				{visibility: "off"} 
			] 
		},
		{ 
			//don't show arterial road lables on the map
			featureType: "road.arterial", 
			elementType: "labels.icon", 
			stylers: [
				{visibility: "off"}
			] 
		},
		{
			//don't show road lables on the map
			featureType: "road",
			elementType: "geometry.stroke",
			stylers: [
				{visibility: "off"}
			]
		}, 
		//style different elements on the map
		{ 
			featureType: "transit", 
			elementType: "geometry.fill", 
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" }, 
				{ lightness: $brightness }, 
				{ saturation: $saturation }
			]
		}, 
		{
			featureType: "poi",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" }, 
				{ lightness: $brightness }, 
				{ saturation: $saturation }
			]
		},
		{
			featureType: "poi.government",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" }, 
				{ lightness: $brightness }, 
				{ saturation: $saturation }
			]
		},
		{
			featureType: "poi.sport_complex",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" }, 
				{ lightness: $brightness }, 
				{ saturation: $saturation }
			]
		},
		{
			featureType: "poi.attraction",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" }, 
				{ lightness: $brightness }, 
				{ saturation: $saturation }
			]
		},
		{
			featureType: "poi.business",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" }, 
				{ lightness: $brightness }, 
				{ saturation: $saturation }
			]
		},
		{
			featureType: "transit",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" }, 
				{ lightness: $brightness }, 
				{ saturation: $saturation }
			]
		},
		{
			featureType: "transit.station",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" }, 
				{ lightness: $brightness }, 
				{ saturation: $saturation }
			]
		},
		{
			featureType: "landscape",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" }, 
				{ lightness: $brightness }, 
				{ saturation: $saturation }
			]
			
		},
		{
			featureType: "road",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" }, 
				{ lightness: $brightness }, 
				{ saturation: $saturation }
			]
		},
		{
			featureType: "road.highway",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" }, 
				{ lightness: $brightness }, 
				{ saturation: $saturation }
			]
		}, 
		{
			featureType: "water",
			elementType: "geometry",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" }, 
				{ lightness: $brightness }, 
				{ saturation: $saturation }
			]
		}
	];
		
	//set google map options
	var map_options = {
      	center: new google.maps.LatLng($latitude, $longitude),
      	zoom: $map_zoom,
      	panControl: false,
      	zoomControl: false,
      	mapTypeControl: false,
      	streetViewControl: false,
      	mapTypeId: google.maps.MapTypeId.ROADMAP,
      	scrollwheel: false,
      	styles: style,
    }
    //inizialize the map
	var map = new google.maps.Map(document.getElementById('map'), map_options);

});

function sameHeight(block) {
	if($('*').is(block)) {
		var maxHeight = 0;
        $(block).each(function () {
            var h_block = parseInt($(this).height());
            if(h_block > maxHeight) {
                maxHeight = h_block;
            };
        });
        $(block).height(maxHeight);
    }
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigkKSB7XHJcblxyXG4gICAgJC5mbi5mb250RmxleCA9IGZ1bmN0aW9uKG1pbiwgbWF4LCBtaWQpIHtcclxuXHJcbiAgICAgICAgdmFyICR0aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBzaXplID0gd2luZG93LmlubmVyV2lkdGggLyBtaWQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2l6ZSA8IG1pbikgc2l6ZSA9IG1pbjtcclxuICAgICAgICAgICAgaWYgKHNpemUgPiBtYXgpIHNpemUgPSBtYXg7XHJcblxyXG4gICAgICAgICAgICAkdGhpcy5jc3MoJ2ZvbnQtc2l6ZScsIHNpemUgKyAncHgnKTtcclxuXHJcbiAgICAgICAgfSkudHJpZ2dlcigncmVzaXplJyk7XHJcbiAgICB9O1xyXG5cclxufSkoalF1ZXJ5KTtcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcblx0JChcIiNidXNpbmVzc1wiKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHQgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG5cdCAgICAgICAgc2Nyb2xsVG9wOiAkKFwiI2J1c2luZXNzRFwiKS5vZmZzZXQoKS50b3AgLSAyMDBcclxuXHQgICAgfSwgMTUwMCk7XHJcblx0fSk7XHJcblxyXG5cdCQoXCIjaGFuZG1hZGVcIikuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0ICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuXHQgICAgICAgIHNjcm9sbFRvcDogJChcIiNoYW5kbWFkZURcIikub2Zmc2V0KCkudG9wIC0gMjAwXHJcblx0ICAgIH0sIDE1MDApO1xyXG5cdH0pO1xyXG5cclxuXHQkKGZ1bmN0aW9uKCkge1xyXG5cdFx0JChcIiN0eXBpbmctdGV4dFwiKS50eXBlZCh7XHJcblx0ICAgICAgc3RyaW5nczogW1xyXG5cdCAgICAgICAgXCLRjdC80L7RhtC40LlcIixcclxuXHQgICAgICAgIFwi0YDQsNC00L7RgdGC0LhcIixcclxuXHQgICAgICAgIFwi0YPQtNC+0LLQvtC70YzRgdGC0LLQuNGPXCIsXHJcblx0ICAgICAgICBcItCy0L7RgdGC0L7RgNCz0LBcIixcclxuXHQgICAgICAgIFwi0L3QtdC+0LbQuNC00LDQvdC90L7RgdGC0LhcIixcclxuXHQgICAgICAgIFwi0LDQutGG0LXQvdGCXCJcclxuXHQgICAgICBdLFxyXG5cdCAgICAgIHR5cGVTcGVlZDogMTAwLFxyXG5cdCAgICAgIGJhY2tEZWxheTogMjAwMCxcclxuXHQgICAgICBsb29wOiB0cnVlLFxyXG5cdCAgfSk7XHJcblx0fSk7XHJcblxyXG5cdHZhciBzd2lwZXJNYWluID0gbmV3IFN3aXBlcignLm1haW4tc2xpZGVyJywge1xyXG5cdCAgc2xpZGVzUGVyVmlldzogJ2F1dG8nLFxyXG5cdCAgc3BhY2VCZXR3ZWVuOiAzMCxcclxuXHQgIGNlbnRlcmVkU2xpZGVzOiB0cnVlLFxyXG5cdCAgdG91Y2hSYXRpbzogMCxcclxuXHQgIDEwMjM6IHtcclxuXHRcdGNlbnRlcmVkU2xpZGVzOiBmYWxzZVxyXG5cdCAgfSxcclxuXHR9KTtcclxuXHJcblxyXG5cdCQoJy5zZWNvbmQtc2xpZGVyJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdHZhciBlbCA9ICQodGhpcykuYXR0cignZGF0YS1udW1iZXInKTtcclxuXHRcdGVsID0gbmV3IFN3aXBlcignLnNlY29uZC1zbGlkZXJbZGF0YS1udW1iZXI9XCInICsgZWwgKyAnXCJdJywge1xyXG5cdFx0ICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXHJcblx0XHQgIGNlbnRlcmVkU2xpZGVzOiB0cnVlLFxyXG5cdFx0ICBzY3JvbGxiYXI6IHtcclxuXHRcdCAgICBlbDogJy5zd2lwZXItc2Nyb2xsYmFyJyxcclxuXHRcdCAgICBoaWRlOiBmYWxzZSxcclxuXHRcdCAgfSxcdFx0ICBcclxuXHRcdCAgb246IHtcclxuXHRcdCAgXHRzbGlkZU5leHRUcmFuc2l0aW9uRW5kOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRpZigkKCcuc2Vjb25kLXNsaWRlciAuc3dpcGVyLXNsaWRlOmxhc3QtY2hpbGQnKS5oYXNDbGFzcygnc3dpcGVyLXNsaWRlLWFjdGl2ZScpKSB7XHJcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdHN3aXBlck1haW4uc2xpZGVOZXh0KCk7XHJcblx0XHRcdFx0fSw1MDApO1xyXG5cdFx0XHQgIH1cclxuXHRcdFx0fSxcclxuXHRcdFx0c2xpZGVQcmV2VHJhbnNpdGlvbkVuZDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0aWYoJCgnLnNlY29uZC1zbGlkZXIgLnN3aXBlci1zbGlkZTpmaXJzdC1jaGlsZCcpLmhhc0NsYXNzKCdzd2lwZXItc2xpZGUtYWN0aXZlJykpIHtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0c3dpcGVyTWFpbi5zbGlkZVByZXYoKTtcclxuXHRcdFx0XHR9LDUwMCk7XHJcblx0XHRcdCAgfVxyXG5cdFx0XHR9XHJcblx0XHQgIH1cclxuXHRcdH0pO1xyXG5cdFx0JCh0aGlzKS5wYXJlbnQoKS5maW5kKCcuaWNvbi1hcnJvdy1yaWdodCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRlbC5zbGlkZU5leHQoKTtcclxuXHRcdFx0aWYoJCgnLnNlY29uZC1zbGlkZXIgLnN3aXBlci1zbGlkZTpsYXN0LWNoaWxkJykuaGFzQ2xhc3MoJ3N3aXBlci1zbGlkZS1hY3RpdmUnKSkge1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRzd2lwZXJNYWluLnNsaWRlTmV4dCgpO1xyXG5cdFx0XHRcdH0sNTAwKTtcclxuXHRcdFx0ICB9XHJcblx0XHR9KTtcclxuXHRcdCQodGhpcykucGFyZW50KCkuZmluZCgnLmljb24tYXJyb3ctbGVmdCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRlbC5zbGlkZVByZXYoKTtcclxuXHRcdFx0aWYoJCgnLnNlY29uZC1zbGlkZXIgLnN3aXBlci1zbGlkZTpmaXJzdC1jaGlsZCcpLmhhc0NsYXNzKCdzd2lwZXItc2xpZGUtYWN0aXZlJykpIHtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0c3dpcGVyTWFpbi5zbGlkZVByZXYoKTtcclxuXHRcdFx0XHR9LDUwMCk7XHJcblx0XHRcdCAgfVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdCQoJy5tYWluLXNsaWRlciAuc3dpcGVyLXNsaWRlJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgaSA9ICQodGhpcykuaW5kZXgoKTtcclxuXHRcdHN3aXBlck1haW4uc2xpZGVUbyhpKTtcclxuXHR9KTtcclxuXHJcblx0XHJcblxyXG5cdHNhbWVIZWlnaHQoJy5jYXJkcyAucmFkaW8nKTtcclxuXHJcblx0JCgnLmNhcmRzIC5yYWRpbycpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyIHBhcmVudE9mZnNldCA9ICQodGhpcykub2Zmc2V0KCk7IFxyXG5cdCAgIHZhciByZWxYID0gZS5wYWdlWCAtIHBhcmVudE9mZnNldC5sZWZ0O1xyXG5cdCAgIHZhciByZWxZID0gZS5wYWdlWSAtIHBhcmVudE9mZnNldC50b3A7XHJcblx0ICAgJCgnLmNhcmRzIC5yYWRpbycpLnJlbW92ZUNsYXNzKCdjaGVja2VkJyk7XHJcblx0ICAgJCgnLmNhcmRzIC5yYWRpbyAuY2lyY2xlJykucmVtb3ZlQ2xhc3MoJ2FuaW1hdGUnKS5jc3MoJ2xlZnQnLCdpbml0aWFsJykuY3NzKCd0b3AnLCdpbml0aWFsJyk7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcuY2lyY2xlJykuY3NzKCdsZWZ0JyxyZWxYKS5jc3MoJ3RvcCcscmVsWSkuYWRkQ2xhc3MoJ2FuaW1hdGUnKTtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdjaGVja2VkJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcudGltZSAucmFkaW8nKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICBcdCQoJy50aW1lIC5yYWRpbycpLnJlbW92ZUNsYXNzKCdjaGVja2VkJyk7XHJcbiAgICBcdCQodGhpcykuYWRkQ2xhc3MoJ2NoZWNrZWQnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBzbGlkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmFuZ2UnKTtcclxuXHJcbiAgICB2YXIgcmFuZ2VNaW4gPSAwLFxyXG4gICAgXHRyYW5nZU1heCA9IDUwMDA7XHJcblxyXG5cdG5vVWlTbGlkZXIuY3JlYXRlKHNsaWRlciwge1xyXG5cdFx0c3RhcnQ6IFsyNTAwXSxcclxuXHRcdGNvbm5lY3Q6IFt0cnVlLCBmYWxzZV0sXHJcblx0XHRyYW5nZToge1xyXG5cdFx0XHQnbWluJzogcmFuZ2VNaW4sXHJcblx0XHRcdCdtYXgnOiByYW5nZU1heFxyXG5cdFx0fSxcclxuXHRcdHN0ZXA6IDEwLFxyXG5cdFx0cGlwczoge1xyXG5cdFx0XHRtb2RlOiAndmFsdWVzJyxcclxuXHRcdFx0dmFsdWVzOiBbcmFuZ2VNaW4sIHJhbmdlTWF4XSxcclxuXHRcdFx0ZGVuc2l0eTogcmFuZ2VNYXhcclxuXHRcdH0sXHJcblx0XHRmb3JtYXQ6IHdOdW1iKHtcclxuXHQgICAgICAgIGRlY2ltYWxzOiAwXHJcblx0ICAgIH0pLFxyXG5cdCAgICB0b29sdGlwczogdHJ1ZVxyXG5cclxuXHR9KTtcclxuXHQvL3NldCB5b3VyIGdvb2dsZSBtYXBzIHBhcmFtZXRlcnNcclxuXHR2YXIgJGxhdGl0dWRlID0gIDU4LjAxNjM5LFxyXG5cdFx0JGxvbmdpdHVkZSA9IDU2LjI1MDg0MixcclxuXHRcdCRtYXBfem9vbSA9IDE2O1xyXG5cclxuXHQvL2dvb2dsZSBtYXAgY3VzdG9tIG1hcmtlciBpY29uIC0gLnBuZyBmYWxsYmFjayBmb3IgSUUxMVxyXG5cdHZhciBpc19pbnRlcm5ldEV4cGxvcmVyMTE9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCd0cmlkZW50JykgPiAtMTtcclxuXHRcclxuXHQvL2RlZmluZSB0aGUgYmFzaWMgY29sb3Igb2YgeW91ciBtYXAsIHBsdXMgYSB2YWx1ZSBmb3Igc2F0dXJhdGlvbiBhbmQgYnJpZ2h0bmVzc1xyXG5cdHZhclx0JG1haW5fY29sb3IgPSAnIzJkMzEzZicsXHJcblx0XHQkc2F0dXJhdGlvbj0gLTEwMCxcclxuXHRcdCRicmlnaHRuZXNzPSA1O1xyXG5cclxuXHQvL3dlIGRlZmluZSBoZXJlIHRoZSBzdHlsZSBvZiB0aGUgbWFwXHJcblx0dmFyIHN0eWxlPSBbIFxyXG5cdFx0e1xyXG5cdFx0XHQvL3NldCBzYXR1cmF0aW9uIGZvciB0aGUgbGFiZWxzIG9uIHRoZSBtYXBcclxuXHRcdFx0ZWxlbWVudFR5cGU6IFwibGFiZWxzXCIsXHJcblx0XHRcdHN0eWxlcnM6IFtcclxuXHRcdFx0XHR7c2F0dXJhdGlvbjogJHNhdHVyYXRpb259XHJcblx0XHRcdF1cclxuXHRcdH0sICBcclxuXHQgICAge1x0Ly9wb2kgc3RhbmRzIGZvciBwb2ludCBvZiBpbnRlcmVzdCAtIGRvbid0IHNob3cgdGhlc2UgbGFibGVzIG9uIHRoZSBtYXAgXHJcblx0XHRcdGZlYXR1cmVUeXBlOiBcInBvaVwiLFxyXG5cdFx0XHRlbGVtZW50VHlwZTogXCJsYWJlbHNcIixcclxuXHRcdFx0c3R5bGVyczogW1xyXG5cdFx0XHRcdHt2aXNpYmlsaXR5OiBcIm9mZlwifVxyXG5cdFx0XHRdXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XHQvL2Rvbid0IHNob3cgaGlnaHdheXMgbGFibGVzIG9uIHRoZSBtYXBcclxuXHQgICAgICAgIGZlYXR1cmVUeXBlOiAncm9hZC5oaWdod2F5JyxcclxuXHQgICAgICAgIGVsZW1lbnRUeXBlOiAnbGFiZWxzJyxcclxuXHQgICAgICAgIHN0eWxlcnM6IFtcclxuXHQgICAgICAgICAgICB7dmlzaWJpbGl0eTogXCJvZmZcIn1cclxuXHQgICAgICAgIF1cclxuXHQgICAgfSwgXHJcblx0XHR7IFx0XHJcblx0XHRcdC8vZG9uJ3Qgc2hvdyBsb2NhbCByb2FkIGxhYmxlcyBvbiB0aGUgbWFwXHJcblx0XHRcdGZlYXR1cmVUeXBlOiBcInJvYWQubG9jYWxcIiwgXHJcblx0XHRcdGVsZW1lbnRUeXBlOiBcImxhYmVscy5pY29uXCIsIFxyXG5cdFx0XHRzdHlsZXJzOiBbXHJcblx0XHRcdFx0e3Zpc2liaWxpdHk6IFwib2ZmXCJ9IFxyXG5cdFx0XHRdIFxyXG5cdFx0fSxcclxuXHRcdHsgXHJcblx0XHRcdC8vZG9uJ3Qgc2hvdyBhcnRlcmlhbCByb2FkIGxhYmxlcyBvbiB0aGUgbWFwXHJcblx0XHRcdGZlYXR1cmVUeXBlOiBcInJvYWQuYXJ0ZXJpYWxcIiwgXHJcblx0XHRcdGVsZW1lbnRUeXBlOiBcImxhYmVscy5pY29uXCIsIFxyXG5cdFx0XHRzdHlsZXJzOiBbXHJcblx0XHRcdFx0e3Zpc2liaWxpdHk6IFwib2ZmXCJ9XHJcblx0XHRcdF0gXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XHQvL2Rvbid0IHNob3cgcm9hZCBsYWJsZXMgb24gdGhlIG1hcFxyXG5cdFx0XHRmZWF0dXJlVHlwZTogXCJyb2FkXCIsXHJcblx0XHRcdGVsZW1lbnRUeXBlOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxyXG5cdFx0XHRzdHlsZXJzOiBbXHJcblx0XHRcdFx0e3Zpc2liaWxpdHk6IFwib2ZmXCJ9XHJcblx0XHRcdF1cclxuXHRcdH0sIFxyXG5cdFx0Ly9zdHlsZSBkaWZmZXJlbnQgZWxlbWVudHMgb24gdGhlIG1hcFxyXG5cdFx0eyBcclxuXHRcdFx0ZmVhdHVyZVR5cGU6IFwidHJhbnNpdFwiLCBcclxuXHRcdFx0ZWxlbWVudFR5cGU6IFwiZ2VvbWV0cnkuZmlsbFwiLCBcclxuXHRcdFx0c3R5bGVyczogW1xyXG5cdFx0XHRcdHsgaHVlOiAkbWFpbl9jb2xvciB9LFxyXG5cdFx0XHRcdHsgdmlzaWJpbGl0eTogXCJvblwiIH0sIFxyXG5cdFx0XHRcdHsgbGlnaHRuZXNzOiAkYnJpZ2h0bmVzcyB9LCBcclxuXHRcdFx0XHR7IHNhdHVyYXRpb246ICRzYXR1cmF0aW9uIH1cclxuXHRcdFx0XVxyXG5cdFx0fSwgXHJcblx0XHR7XHJcblx0XHRcdGZlYXR1cmVUeXBlOiBcInBvaVwiLFxyXG5cdFx0XHRlbGVtZW50VHlwZTogXCJnZW9tZXRyeS5maWxsXCIsXHJcblx0XHRcdHN0eWxlcnM6IFtcclxuXHRcdFx0XHR7IGh1ZTogJG1haW5fY29sb3IgfSxcclxuXHRcdFx0XHR7IHZpc2liaWxpdHk6IFwib25cIiB9LCBcclxuXHRcdFx0XHR7IGxpZ2h0bmVzczogJGJyaWdodG5lc3MgfSwgXHJcblx0XHRcdFx0eyBzYXR1cmF0aW9uOiAkc2F0dXJhdGlvbiB9XHJcblx0XHRcdF1cclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdGZlYXR1cmVUeXBlOiBcInBvaS5nb3Zlcm5tZW50XCIsXHJcblx0XHRcdGVsZW1lbnRUeXBlOiBcImdlb21ldHJ5LmZpbGxcIixcclxuXHRcdFx0c3R5bGVyczogW1xyXG5cdFx0XHRcdHsgaHVlOiAkbWFpbl9jb2xvciB9LFxyXG5cdFx0XHRcdHsgdmlzaWJpbGl0eTogXCJvblwiIH0sIFxyXG5cdFx0XHRcdHsgbGlnaHRuZXNzOiAkYnJpZ2h0bmVzcyB9LCBcclxuXHRcdFx0XHR7IHNhdHVyYXRpb246ICRzYXR1cmF0aW9uIH1cclxuXHRcdFx0XVxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFx0ZmVhdHVyZVR5cGU6IFwicG9pLnNwb3J0X2NvbXBsZXhcIixcclxuXHRcdFx0ZWxlbWVudFR5cGU6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG5cdFx0XHRzdHlsZXJzOiBbXHJcblx0XHRcdFx0eyBodWU6ICRtYWluX2NvbG9yIH0sXHJcblx0XHRcdFx0eyB2aXNpYmlsaXR5OiBcIm9uXCIgfSwgXHJcblx0XHRcdFx0eyBsaWdodG5lc3M6ICRicmlnaHRuZXNzIH0sIFxyXG5cdFx0XHRcdHsgc2F0dXJhdGlvbjogJHNhdHVyYXRpb24gfVxyXG5cdFx0XHRdXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XHRmZWF0dXJlVHlwZTogXCJwb2kuYXR0cmFjdGlvblwiLFxyXG5cdFx0XHRlbGVtZW50VHlwZTogXCJnZW9tZXRyeS5maWxsXCIsXHJcblx0XHRcdHN0eWxlcnM6IFtcclxuXHRcdFx0XHR7IGh1ZTogJG1haW5fY29sb3IgfSxcclxuXHRcdFx0XHR7IHZpc2liaWxpdHk6IFwib25cIiB9LCBcclxuXHRcdFx0XHR7IGxpZ2h0bmVzczogJGJyaWdodG5lc3MgfSwgXHJcblx0XHRcdFx0eyBzYXR1cmF0aW9uOiAkc2F0dXJhdGlvbiB9XHJcblx0XHRcdF1cclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdGZlYXR1cmVUeXBlOiBcInBvaS5idXNpbmVzc1wiLFxyXG5cdFx0XHRlbGVtZW50VHlwZTogXCJnZW9tZXRyeS5maWxsXCIsXHJcblx0XHRcdHN0eWxlcnM6IFtcclxuXHRcdFx0XHR7IGh1ZTogJG1haW5fY29sb3IgfSxcclxuXHRcdFx0XHR7IHZpc2liaWxpdHk6IFwib25cIiB9LCBcclxuXHRcdFx0XHR7IGxpZ2h0bmVzczogJGJyaWdodG5lc3MgfSwgXHJcblx0XHRcdFx0eyBzYXR1cmF0aW9uOiAkc2F0dXJhdGlvbiB9XHJcblx0XHRcdF1cclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdGZlYXR1cmVUeXBlOiBcInRyYW5zaXRcIixcclxuXHRcdFx0ZWxlbWVudFR5cGU6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG5cdFx0XHRzdHlsZXJzOiBbXHJcblx0XHRcdFx0eyBodWU6ICRtYWluX2NvbG9yIH0sXHJcblx0XHRcdFx0eyB2aXNpYmlsaXR5OiBcIm9uXCIgfSwgXHJcblx0XHRcdFx0eyBsaWdodG5lc3M6ICRicmlnaHRuZXNzIH0sIFxyXG5cdFx0XHRcdHsgc2F0dXJhdGlvbjogJHNhdHVyYXRpb24gfVxyXG5cdFx0XHRdXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XHRmZWF0dXJlVHlwZTogXCJ0cmFuc2l0LnN0YXRpb25cIixcclxuXHRcdFx0ZWxlbWVudFR5cGU6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG5cdFx0XHRzdHlsZXJzOiBbXHJcblx0XHRcdFx0eyBodWU6ICRtYWluX2NvbG9yIH0sXHJcblx0XHRcdFx0eyB2aXNpYmlsaXR5OiBcIm9uXCIgfSwgXHJcblx0XHRcdFx0eyBsaWdodG5lc3M6ICRicmlnaHRuZXNzIH0sIFxyXG5cdFx0XHRcdHsgc2F0dXJhdGlvbjogJHNhdHVyYXRpb24gfVxyXG5cdFx0XHRdXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XHRmZWF0dXJlVHlwZTogXCJsYW5kc2NhcGVcIixcclxuXHRcdFx0c3R5bGVyczogW1xyXG5cdFx0XHRcdHsgaHVlOiAkbWFpbl9jb2xvciB9LFxyXG5cdFx0XHRcdHsgdmlzaWJpbGl0eTogXCJvblwiIH0sIFxyXG5cdFx0XHRcdHsgbGlnaHRuZXNzOiAkYnJpZ2h0bmVzcyB9LCBcclxuXHRcdFx0XHR7IHNhdHVyYXRpb246ICRzYXR1cmF0aW9uIH1cclxuXHRcdFx0XVxyXG5cdFx0XHRcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdGZlYXR1cmVUeXBlOiBcInJvYWRcIixcclxuXHRcdFx0ZWxlbWVudFR5cGU6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG5cdFx0XHRzdHlsZXJzOiBbXHJcblx0XHRcdFx0eyBodWU6ICRtYWluX2NvbG9yIH0sXHJcblx0XHRcdFx0eyB2aXNpYmlsaXR5OiBcIm9uXCIgfSwgXHJcblx0XHRcdFx0eyBsaWdodG5lc3M6ICRicmlnaHRuZXNzIH0sIFxyXG5cdFx0XHRcdHsgc2F0dXJhdGlvbjogJHNhdHVyYXRpb24gfVxyXG5cdFx0XHRdXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XHRmZWF0dXJlVHlwZTogXCJyb2FkLmhpZ2h3YXlcIixcclxuXHRcdFx0ZWxlbWVudFR5cGU6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG5cdFx0XHRzdHlsZXJzOiBbXHJcblx0XHRcdFx0eyBodWU6ICRtYWluX2NvbG9yIH0sXHJcblx0XHRcdFx0eyB2aXNpYmlsaXR5OiBcIm9uXCIgfSwgXHJcblx0XHRcdFx0eyBsaWdodG5lc3M6ICRicmlnaHRuZXNzIH0sIFxyXG5cdFx0XHRcdHsgc2F0dXJhdGlvbjogJHNhdHVyYXRpb24gfVxyXG5cdFx0XHRdXHJcblx0XHR9LCBcclxuXHRcdHtcclxuXHRcdFx0ZmVhdHVyZVR5cGU6IFwid2F0ZXJcIixcclxuXHRcdFx0ZWxlbWVudFR5cGU6IFwiZ2VvbWV0cnlcIixcclxuXHRcdFx0c3R5bGVyczogW1xyXG5cdFx0XHRcdHsgaHVlOiAkbWFpbl9jb2xvciB9LFxyXG5cdFx0XHRcdHsgdmlzaWJpbGl0eTogXCJvblwiIH0sIFxyXG5cdFx0XHRcdHsgbGlnaHRuZXNzOiAkYnJpZ2h0bmVzcyB9LCBcclxuXHRcdFx0XHR7IHNhdHVyYXRpb246ICRzYXR1cmF0aW9uIH1cclxuXHRcdFx0XVxyXG5cdFx0fVxyXG5cdF07XHJcblx0XHRcclxuXHQvL3NldCBnb29nbGUgbWFwIG9wdGlvbnNcclxuXHR2YXIgbWFwX29wdGlvbnMgPSB7XHJcbiAgICAgIFx0Y2VudGVyOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKCRsYXRpdHVkZSwgJGxvbmdpdHVkZSksXHJcbiAgICAgIFx0em9vbTogJG1hcF96b29tLFxyXG4gICAgICBcdHBhbkNvbnRyb2w6IGZhbHNlLFxyXG4gICAgICBcdHpvb21Db250cm9sOiBmYWxzZSxcclxuICAgICAgXHRtYXBUeXBlQ29udHJvbDogZmFsc2UsXHJcbiAgICAgIFx0c3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlLFxyXG4gICAgICBcdG1hcFR5cGVJZDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVAsXHJcbiAgICAgIFx0c2Nyb2xsd2hlZWw6IGZhbHNlLFxyXG4gICAgICBcdHN0eWxlczogc3R5bGUsXHJcbiAgICB9XHJcbiAgICAvL2luaXppYWxpemUgdGhlIG1hcFxyXG5cdHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwgbWFwX29wdGlvbnMpO1xyXG5cclxufSk7XHJcblxyXG5mdW5jdGlvbiBzYW1lSGVpZ2h0KGJsb2NrKSB7XHJcblx0aWYoJCgnKicpLmlzKGJsb2NrKSkge1xyXG5cdFx0dmFyIG1heEhlaWdodCA9IDA7XHJcbiAgICAgICAgJChibG9jaykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBoX2Jsb2NrID0gcGFyc2VJbnQoJCh0aGlzKS5oZWlnaHQoKSk7XHJcbiAgICAgICAgICAgIGlmKGhfYmxvY2sgPiBtYXhIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIG1heEhlaWdodCA9IGhfYmxvY2s7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChibG9jaykuaGVpZ2h0KG1heEhlaWdodCk7XHJcbiAgICB9XHJcbn0iXSwiZmlsZSI6Im1haW4uanMifQ==
