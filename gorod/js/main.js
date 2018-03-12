
var timerId;

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
    pagination: {
      el: '.swiper-pagination-programs',
    },
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
  });

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

