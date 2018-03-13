
var timerId;
var swiperDoing = undefined;

// init on mobile & destroy on desktop
function initSwiper() {
    var screenWidth = $(window).width();        
    if(screenWidth < 767 && swiperDoing == undefined) {            
        $('.swiperMobile').each(function(){
            swiperDoing = new Swiper(this, {  
              pagination: {
                el: '.swiper-pagination',
              },
            })
        });        
    } else if (screenWidth > 768 && swiperDoing != undefined) {            
        swiperDoing.destroy();
        swiperDoing = undefined;
        jQuery('.swiper-wrapper').removeAttr('style');
        jQuery('.swiper-slide').removeAttr('style');            
    }        
}   

// svg mask animation
function mask() {
  $('.swiper-slide-prev .swiperNumber__img.active').removeClass('active');
  $('.swiper-slide-prev .swiperNumber__img:first-child').addClass('active');

  $('.swiper-slide-next .swiperNumber__img.active').removeClass('active');
  $('.swiper-slide-next .swiperNumber__img:first-child').addClass('active');
  
  timerId = setInterval(function() {
    if($('.swiper-slide-active .swiperNumber__img').last().hasClass('active')) {
      $('.swiper-slide-active .swiperNumber__img.active').removeClass('active');
      $('.swiper-slide-active .swiperNumber__img:first-child').addClass('active');
      clearInterval(timerId);
    } else {
      $('.swiper-slide-active .swiperNumber__img.active').removeClass('active').next().addClass('active');
    }  
  }, 900);
}

// set one height for all blocks
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

$(document).ready(function(){
  initSwiper(); 
  
  if($(window).width() >= 768) {
    sameHeight('.news .card__info');
  } else {
    $('.news .card__info').css('height','auto');
  }


  if($(window).scrollTop() >= 15) {
    $('.header').addClass('scroll');
  } else if ($(window).scrollTop() <= 14) {
    $('.header').removeClass('scroll');
  }

  $('.header__search').click(function() {
    $('.header').toggleClass('search');
  });

  // sliders
  if($('*').hasClass('swiperNumber')) {
    var swiperNumber = new Swiper('.swiperNumber', {
      on: {
        slideChange: function() {
          clearInterval(timerId);
          mask();
        }
      },
      pagination: {
        el: '.swiper-pagination',
      },
    });
  }
  
  if($('*').hasClass('swiperCards')) {
    var swiperCards = new Swiper('.swiperCards', {
      slidesPerView: 3,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination-programs',
      },
      breakpoints: {
        767: {
          slidesPerView: 1,
          spaceBetween: 30
        }
      }
    });
  }
  
  if($('*').hasClass('swiperReviews')) {
    var swiperReviews = new Swiper('.swiperReviews', {
      pagination: {
        el: '.swiper-pagination-review',
      },
    });
  }
  
  if($('*').hasClass('swiperClients')) {
    var swiperClients = new Swiper('.swiperClients', {
      slidesPerView: 'auto',
      spaceBetween: 30,
      loop: true,
      freeMode: true,
      autoplay: {
        delay: 500,
      },
      pagination: {
        el: '.swiper-pagination-clients',
      },
    });

    swiperClients.autoplay.stop();

    $(".swiperClients").hover(function(){
      swiperClients.autoplay.start();
    }, function(){
      swiperClients.autoplay.stop();
    });
  } 

  initSwiper();
  


  

  
});

$(window).on('scroll',function() {

  // start mask animation scroll
  if($('*').hasClass('features') && $(window).scrollTop() >= $('.features').position().top - ($('.features').outerHeight() / 2)) {
    mask();
    $(window).off('scroll');
  }

  if($(window).scrollTop() >= 15) {
    $('.header').addClass('scroll');
  } else if ($(window).scrollTop() <= 14) {
    $('.header').removeClass('scroll');
  }

  console.log($(window).scrollTop());

});

//Swiper plugin initialization on window resize
  $(window).on('resize', function(){
      initSwiper();   
      if($(window).width() >= 768) {
        sameHeight('.news .card__info');
      } else {
        $('.news .card__info').css('height','auto');
      }     
  });

