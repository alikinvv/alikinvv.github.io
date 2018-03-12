
var timerId;
var swiperDoing = undefined;

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
  

  $('.header__search').click(function() {
    $('.header').toggleClass('search');
  });

  // sliders
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

  var swiperReviews = new Swiper('.swiperReviews', {
    pagination: {
      el: '.swiper-pagination-review',
    },
  });

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

  //Swiper plugin initialization
  initSwiper();    
  


  swiperClients.autoplay.stop();

  $(".swiperClients").hover(function(){
    swiperClients.autoplay.start();
  }, function(){
    swiperClients.autoplay.stop();
  });

  
});

$(window).on('scroll',function() {

  // start mask animation scroll
  if($(window).scrollTop() >= $('.features').position().top - ($('.features').outerHeight() / 2)) {
    mask();
    $(window).off('scroll');
  }

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

