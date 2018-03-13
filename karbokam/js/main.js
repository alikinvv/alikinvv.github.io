var countRotateImg = 41,
    rotateImgSize = 540,
    rotateCompression = 5,
    rotateWrapperHeight = 500,
    rotateSteps = rotateWrapperHeight / countRotateImg;
    if($('.blue-package').is('div')) 
        var rotateWrapperOffset = $('.blue-package').offset().top;

var countRightImg = 78,
    twoWrapperHeight = 500,
    rightSteps = twoWrapperHeight / countRightImg;
    if($('.two').is('div'))
        var twoWrapperOffset = $('.two').offset().top;

var countLeftImg = 81,
    leftSteps = twoWrapperHeight / countLeftImg;

// breakpoints

if($('body').width() <= 1366 && $('body').width() >= 1280) {
    var brFeat = 1700,
        brReviews = 2400,
        brSectionProject = 2800,
        brTeam = 3300,
        scrollMapMin = 3900,
        scrollMapMax = 4100,
        firstState = 352,
        brMap;
} else if($('body').width() <= 1023 && $('body').width() >= 768) {
    var brFeat = 1700,
        brReviews = 2400,
        brSectionProject = 2900,
        brTeam = 3200,
        scrollMapMin = 3607,
        scrollMapMax = 3829,
        firstState = 352,
        brMap;
} else if($('body').width() <= 767 && $('body').width() >= 640) {
    var brFeat = 1600,
        brReviews = 2400,
        brSectionProject = 2775,
        brTeam = 3190,
        scrollMapMin = 3552,
        scrollMapMax = 3829,
        firstState = 352,
        brMap;
} else if($('body').width() <= 639 && $('body').width() >= 480) {
    var brFeat = 1600,
        brReviews = 2400,
        brSectionProject = 2775,
        brTeam = 3190,
        scrollMapMin = 3552,
        scrollMapMax = 3829,
        firstState = 217,
        brMap;
} else if($('body').width() <= 479) {
        var brFeat = 1600,
            brReviews = 2400,
            brSectionProject = 2775,
            brTeam = 3060,
            scrollMapMin = 3460,
            scrollMapMax = 3829,
            firstState = 217,
            brMap;
} else {
    var brFeat = 1700,
        brReviews = 2400,
        brSectionProject = 2900,
        brTeam = 3561,
        scrollMapMin = 4000,
        scrollMapMax = 4300,
        firstState = 352,
        brMap;
}

$(window).load(function() {
    setTimeout(function() {
        $(this).scrollTop(0);
        $('body').css('overflow-y','auto');
        $('.blue-package img.visible').removeClass('visible');
        $('.blue-package img:first-child').addClass('visible');
        $('.two img.visible').removeClass('visible');
        setTimeout(function() {
            $('.loader').fadeOut();
            $('.blue-package').removeClass('up');
        }, 100);
    },100);


    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        console.log('Scroll position: ' + scroll);

         /* train animation */
         if($(window).width() >= 1400 ) {
            scroll >= 690 ? $('.train').addClass('active') : '';
         } else {
             scroll >= 890 ? $('.train').addClass('active') : '';
         }    

        //	1 state - loading page
        if(scroll < firstState) {
            $('.blue-package').removeClass('fixed');
            $('.blue-package img.visible').removeClass('visible');
            $('.blue-package img.blue-rotate1').addClass('visible');
        }

        // 2 state - rotate blue package
        if(scroll >= firstState && scroll <= 900) {
            $('.two .slide img').removeClass('visible');
            $('.blue-package').addClass('fixed');
            $('.two').removeClass('fixed');
            $('.two .info').css('width','0');
            for(var i = 1; i <= countRotateImg;i++) {
                if(scroll >= 352 + rotateSteps*i) {
                    $('.blue-package img.visible').removeClass('visible');
                    $('.blue-package img.blue-rotate'+ i +'').addClass('visible');
                }
            }
        }

        //  3 state - slide 2 packages outside
        if(scroll >= 900 && scroll <= 1440) {
            $('.blue-package img').removeClass('visible');
            $('.two .slide img').first().addClass('visible');
            $('.two').removeClass('done');
            $('.two').addClass('fixed');
            $('.feat').removeClass('margin');	
            	
            for(var i = 1; i <= countRightImg;i++) {
                if(scroll >= 900 + rightSteps*i) {
                    $('.two .right img.visible').removeClass('visible');
                    $('.two .right img.blue-right'+ i +'').addClass('visible');
                }
            }

            scroll >= 900 && scroll <= 910 ? $('.two .right img:not(.blue-right1)').removeClass('visible') : '';

            if($(document).width() <= 1023) {
                var infoEase = 1.5;
            } else {
                var infoEase = 1;
            }
            for(var i = 1; i <= countRightImg;i++) {
                scroll >= 900 + rightSteps*i ? $('.two .info').css('width',i*infoEase +'%') : '';
            }
            for(var i = 1; i <= countLeftImg;i++) {
                if(scroll >= 900 + leftSteps*i) {
                    $('.two .left img.visible').removeClass('visible');
                    $('.two .left img.blue-left'+ i +'').addClass('visible');
                }
            }
        }
        
        // 4 state - end of animation slide outside
        if(scroll >= 1440) {
            $('.blue-package img').removeClass('visible');
            $('.two').addClass('done');
            
        }

        // show features section
        if(scroll >= brFeat) {
            $('.blue-package img').removeClass('visible');
            $('.feat').addClass('margin');
        }
        
        // show reviews section
        scroll >= brReviews ? $('.reviews').addClass('visible') : '';

        // show image slider
        scroll >= brSectionProject ? $('.section-project').addClass('visible') : '';

        // show team section
        if($(window).width() >= 768) {
            scroll >= brTeam ? $('.team').addClass('visible') : '';
        } else {
            scroll >= brTeam ? $('.team-mobile').addClass('visible') : '';
        }

        // range scroll to map
        if(scroll >= scrollMapMin && scroll <= scrollMapMax) {
            !$('body').is('.show-map') ? $('html').animate({scrollTop: brMap},200) : '';
            brMap = parseInt($('.supply').offset().top);
        }

        // show map section
        if(scroll >= brMap) {
            $('body').addClass('show-map');
            $('.supply').addClass('visible');            

            setTimeout(function() {
                // circles
                $.each($('.supply .circle'), function (i, t) {
                    var $this = $(t);
                    setTimeout(function () {
                        $this.addClass('show');
                    }, i * 100);
                });

                // counters
                $('.counter').each(function() {
                    var $this = $(this),
                        countTo = $this.attr('data-count');
                    
                    $({ countNum: $this.text()}).animate({
                        countNum: countTo
                    }, {
                        duration: 1500,
                        easing:'linear',
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(this.countNum);
                        }
                    });  
                });
                $('.title .icon-package').addClass('count');
            }, 1400);
        }
    });    
});

$(document).ready(function () {   

    /* flip slider */
    var FlipSlider = function($el) {
    this.$el = $el;
    this.$slides = this.$el.find('.js-flipper').children();
    this.$btnNext = $('.text-slider .swiper-button-next');
    this.$btnPrev = $('.text-slider .swiper-button-prev');
    this.slideIndex = 1;
    this.$currentSlide;
    
    this.init();
    }

    FlipSlider.prototype = {
    init: function() {
        var _this = this;
        
        this.$btnNext.on('click', function() {
        _this.slideNext();
        });
        
        this.$btnPrev.on('click', function() {
        _this.slidePrev();
        });
    },
    slideNext: function() {
        var _this = this;
        if ( this.slideIndex < this.$slides.length ) {
        _this.$currentSlide = $('.flip-item.is-active');
        _this.$currentSlide.addClass('turnToLeft')
                            .removeClass('is-active')
                            .removeClass('turnToRight')
                            .next().addClass('is-active');
        _this.slideIndex ++;
        }
    },
    slidePrev: function() {
        var _this = this;
        if ( this.slideIndex > 1 ) {
        _this.$currentSlide = $('.flip-item.is-active');
        _this.$currentSlide.addClass('turnToRight')
                            .removeClass('is-active')
                            .removeClass('turnToLeft')
                            .prev().addClass('is-active');
        _this.slideIndex --;
        }
    }
    }

    $('.js-flip-slider').each(function() {
    var flipSlider = new FlipSlider($(this));
    });


    /* modal selection */
    if($(window).width() >= 641) {
        $('.selection a').click(function(e) {
            e.preventDefault();
            $('.selection a').removeClass('active');
            $(this).addClass('active');
        });
    } else {
        $('.selection a').click(function(e) {
            e.preventDefault();
            $(this).addClass('active');
            $('.modal-body').addClass('step');
            setTimeout(function() {
                $('.selection').hide();
            },1000);
        });
    }
    
    
    /* main page animation packages */
	if($('.blue-package').is('div')) {
				
		$('.blue-package').height(rotateWrapperHeight);

		//create imgs rotate
		for(var i = 1, size = rotateImgSize; i <= countRotateImg; i++, size = size - rotateCompression) {
			$('.blue-package').append('<img src="img/blue/rotate/'+ i +'.png" class="blue-rotate'+ i +' visible" width="'+ size +'">');
        }
        
        // create imgs right
        var rightEase, leftEase;
        if($(window).width() <= 1200 && $(window).width() >= 1024) {
            rightEase = 2;
            leftEase = 1.2;
        } else if($(window).width() <= 1023 && $(window).width() >= 768) {
            rightEase = 0;
            leftEase = 0;
        } else if($(window).width() <= 767 && $(window).width() >= 480) {
            rightEase = 0.5;
            leftEase = 0;
        } else if($(window).width() <= 479) {
             rightEase = 0.5;
             leftEase = 0.5;
        } else {
            rightEase = 3.25;
            leftEase = 2.55;
        }
		for(var i = 1, right = 0; i <= countRightImg; i++, right = right + rightEase) {
			$('.two .right').append('<img src="img/blue/right/'+ i +'.png" class="blue-right'+ i +' visible" style="right: -'+ right +'px">');
        }
        
		// create imgs left
		for(var i = 1, left = 0; i <= countLeftImg; i++, left = left + leftEase) {
			$('.two .left').append('<img src="img/green/'+ i +'.png" class="blue-left'+ i +' visible" style="left: -'+ left +'px">');
		}	
	}
    
    /* lazy load images */

    $("img").lazyload({
        effect : "fadeIn"
    });   

        /* Main Navigation */

    if ($('body').width() <= 1020) {
        $('.menu').addClass('mobile');
    } else {
        $('.menu').removeClass('mobile');
    }

    $('.hm a').click(function(e){
        e.preventDefault();
        $('.menu-trigger').toggle();
        $('.hm').toggleClass('round');
        $('.menu-close').toggleClass('active');
        $('.drop-down').toggleClass('down');
        $('.menu.mobile').toggleClass('active');
        $("html,body").toggleClass('overflow');
        $('.lang').toggle();
    });

    $('.menu.mobile a').click(function () {
        $('.menu.mobile').removeClass('active');
        $('.hm').toggleClass('round');
        $('.menu-trigger').toggle();
        $('.menu-close').toggleClass('active');
        $("html,body").toggleClass('overflow');
    });

    window.addEventListener('load', function(){
        var movingBar = new MovingBar('.menu ul');
    });

    $('.current-page-ancestor').addClass('active');

    var menuTrigger = false;
    $('.menu ul li').is('.active') ? menuTrigger = true : menuTrigger = false;

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

        if($('.menu ul li').is('.active')) 
            var activeBarLeft = $('.menu ul li.active').offset().left;        

        var activeBar = $('.menu ul li.active');
        var navWrapperLeft = $('.menu ul').offset().left;
        var activeBarWidth = $('.menu ul li.active').width();
        var spanEffect = $('span.effect');


        var ease = 15;
        $(spanEffect).css('left',activeBarLeft-navWrapperLeft+ease+'px');
        $(spanEffect).css('width',activeBarWidth+'px');

        $('.modal-link').click(function() {
            if($('.menu li').hasClass('active')) {
                menuTrigger = true;
                $('.modal-link').addClass('active');
            } else {
                menuTrigger = true;
                $('.modal-link').addClass('active');
            }            
        });

        $('.menu').on('mouseleave', function () {
            if (menuTrigger && !$('.modal-link').hasClass('active')) {
                $(spanEffect).css('left',activeBarLeft-navWrapperLeft+ease+'px');
                $(spanEffect).css('width',activeBarWidth+'px');
            } else if(menuTrigger && $('.modal-link').hasClass('active')) {
                $(spanEffect).css('left', $('.modal-link').offset().left-navWrapperLeft+ease+'px');
                $(spanEffect).css('width', '165px');
            } else {
                $(spanEffect).css('width','0px');                
            }

        });

        function barMovingCurrentMenu( width, left ) {
            bar.style.width = width+20 + 'px';
            bar.style.left = left-10 + 'px';
        }       
    };

    /* modal close button */

    $('.modal .close').click(function() {
        $('.modal').modal('hide');
        $('.selection a').removeClass('active');  
        $('.modal-link').removeClass('active');
        if($('.menu li:not(.modal-link)').hasClass('active')) {
            if($('body').width() <= 1366 && $('body').width() > 1200) {
                var ease = 2;
            } else {
                var ease = 15;
            }
            menuTrigger = true;
            $($('span.effect')).css('left', $('.menu ul li.active').offset().left-$('.menu ul').offset().left+ease+'px');
            $($('span.effect')).css('width',$('.menu ul li.active').width()+'px');
        } else {            
            $('span.effect').css('width','0px');
            menuTrigger = false;
        }
    });

	/* sliders */
    if($('.area').hasClass('light')) {
        var mySwiperArea = new Swiper ('.area', {
            slidesPerView: 'auto',
            spaceBetween: 30
        })
    } else {
        var mySwiperArea = new Swiper ('.area', {
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 30
        })
    }

	var mySwiperReviews = new Swiper ('.reviews-slider', {
        direction: 'vertical',
        slidesPerView: 1,
        spaceBetween: 30,
		mousewheelControl: true,
        effect: 'fade',
        mousewheelSensitivity: 0,
        mousewheelReleaseOnEdges: true,
        onReachEnd: function(){
            mySwiperReviews.params.mousewheelControl = false;
        }
	})

	var mySwiperFeat = new Swiper ('.feat-wrapper', {
        nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		effect: 'fade'
    })

    var mySwiperFeat = new Swiper ('.text-slider', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        simulateTouch: false
    })

	var swiper = new Swiper('.blur-slider', {
        slidesPerView: 'auto',
		spaceBetween: 30,
		nextButton: '.icon-arrow-left',
        prevButton: '.icon-arrow-right',
        centeredSlides: true,
        loop: true
    });

    var swiper = new Swiper('.team-mobile-slider', {
		nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        loop: true
    });

    $(".project-detail").slick({
        slidesToShow: 1,
        arrows: true,
        asNavFor: '.project-strip',
        autoplaySpeed: 3000,
        draggable: false
    });

    $(".project-strip").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: '.project-detail',
        dots: false,
        infinite: true,
        draggable: false
    });

    // The height of all the blocks is equal to the greater 
	if($('.feat-wrapper').is('div')) {
		var mh = 0;
		$('.feat-wrapper .swiper-slide .col-xs-4').each(function () {
			var h_block = parseInt($(this).height());
			h_block > mh ? mh = h_block : '';
		});
		$('.feat-wrapper .swiper-slide').height(mh+20);
    } 
    
	/* form animation*/
    $('form .btn-fly').click(function(e) {
		var $parentForm = $(this).parent('form');
		var $parentModal = $(this).parent('.modal-dialog');
        e.preventDefault();
        if($(this).parent('form').find('input[name="name"]').val()) {
            if($('.modal').hasClass('in')) {
                $(this).toggleClass('action');
                setTimeout(function() {$('.modal').modal('hide');},1100);
            } else {
                $(this).toggleClass('action');
            }			
		} else {
            if($('.modal').hasClass('in')) {
                $('.modal-dialog').removeClass('shake');
                setTimeout(function() {$('.modal-dialog').addClass('shake');},10);                
            } else {
                $(this).parent('form').removeClass('shake');
                setTimeout(function() {$($parentForm).addClass('shake');},10);
            }
			
		}
	});

	$('form input').focus(function () {
        $(this).siblings('label').addClass('top');
    });

    /* sticky package */
    
    if($('body').width() <= 1200 && $('body').width() > 1020) {
        $(".sticky").sticky({
            topSpacing: 209,
            bottomSpacing: 570
        });
    } else if($('body').width() <= 1020) {

    }  else {
        $(".sticky").sticky({
            topSpacing: 209,
            bottomSpacing: 480
        });
    }

	/* maps */

	if($('#map').is('div')) {
		
        /* maps */
        var map;
        function initialize(condition) {

            var gmarkers = [];
            var infowindow = null;

            var styles = [
                {
                    featureType: "administrative",
                    elementType: "all",
                    stylers: [
                        { saturation: -199 }
                    ]
                },{
                    featureType: "landscape",
                    elementType: "all",
                    stylers: [
                        { saturation: -199 }
                    ]
                },{
                    featureType: "poi",
                    elementType: "all",
                    stylers: [
                        { saturation: -199 }
                    ]
                },{
                    featureType: "road",
                    elementType: "all",
                    stylers: [
                        { saturation: -179 }
                    ]
                },{
                    featureType: "transit",
                    elementType: "all",
                    stylers: [
                        { saturation: -179 }
                    ]
                },{
                    featureType: "water",
                    elementType: "all",
                    stylers: [
                        { saturation: -79 }
                    ]
                }
            ];

            var mapOptions = {
                center: new google.maps.LatLng(58.076748, 55.754202),
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false,
                zoomControl: false,
                styles: styles,
                draggable: true
            };

            map = new google.maps.Map(document.getElementById("map"), mapOptions);

            var image = '../src/img/logo-small.png';
            var markerIncab = new google.maps.Marker({
                position: {lat: 58.076748, lng: 55.754202},
                map: map,
                icon: image,
                size: new google.maps.Size(20, 32),
            });

        }

        // add window listener for GMaps
        google.maps.event.addDomListener(window, 'load', initialize);
	}
});


/* CANVAS */

if($('.canvas-wrapper').is('div')) {

    (function () {
        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        window.requestAnimationFrame = requestAnimationFrame;
    })();

    var canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d");

    canvas.height = 800;
    canvas.width = 1000;

    var parts = [],
        minSpawnTime = 40,
        lastTime = new Date().getTime(),
        maxLifeTime = Math.min(5000, (canvas.height/(1.5*60)*1600)),
        emitterX = 0,
        emitterY = 400,
        smokeImage = new Image();

    function spawn() {
        if (new Date().getTime() > lastTime + minSpawnTime) {
            lastTime = new Date().getTime();
            parts.push(new smoke(emitterX, emitterY));
        }
    }

    function render() {
        var len = parts.length;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        while (len--) {
            if (parts[len].y < 0 || parts[len].lifeTime > maxLifeTime) {
                parts.splice(len, 1);
            } else {
                parts[len].update();

                ctx.save();
                var offsetX = -parts[len].size/2,
                    offsetY = -parts[len].size/2;
            
                ctx.translate(parts[len].x-offsetX, parts[len].y-offsetY);
                ctx.rotate(parts[len].angle / 180 * Math.PI);
                ctx.globalAlpha  = parts[len].alpha;
                ctx.drawImage(smokeImage, offsetX,offsetY, parts[len].size, parts[len].size);
                ctx.restore();
            }
        }
        spawn();
        requestAnimationFrame(render);
    }

    function smoke(x, y, index) {
        this.x = x;
        this.y = y;

        this.size = 80;
        this.startSize = 0;
        this.endSize = 75;

        this.angle = Math.random() * 339;

        this.startLife = new Date().getTime();
        this.lifeTime = 0;

        this.velY = -1 - (Math.random()*0.5) * 4;
        this.velX = Math.floor(Math.random() * (-6) + 3) / 10;
    }

    smoke.prototype.update = function () {
        this.lifeTime = new Date().getTime() - this.startLife;
        this.angle += 0.2;
        
        var lifePerc = ((this.lifeTime / maxLifeTime) * 100);

        this.size = this.startSize + ((this.endSize - this.startSize) * lifePerc * .1);

        this.alpha = 1 - (lifePerc * .01);
        this.alpha = Math.max(this.alpha,0);
        
        this.x += this.velX;
        this.y += this.velY;
    }

    smokeImage.src = "https://preview.ibb.co/m5Vcf5/image.png";
    smokeImage.onload = function () {
        render();
    }

    window.onresize = resizeMe;
    window.onload = resizeMe;
    function resizeMe() {
    canvas.height = 800;
    }
}