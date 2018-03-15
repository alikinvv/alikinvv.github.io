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
  if($('*').hasClass('swiperNumber')) {
    var swiperNumber = new Swiper('.swiperNumber', {
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
      autoplay: {
        delay: 300,
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
  
  // open modal
  $('a[data-modal]').click(function(e) {
    e.preventDefault();
    $('.modal[data-modal="'+ $(this).attr('data-modal') +'"]').addClass('sh');
  });

  $('.footer__subscribe .btn').click(function(e) {
    e.preventDefault();
    $('.modal[data-modal="sub"]').addClass('sh success');
  });  

  // close modal
  $('.modal .closeForm').click(function() {
    $(this).parent().parent().removeClass('sh');
  });

  if($(window).width() <= 767) {
    $('.header .row').append('<div class="hamburger"><span></span><span></span><span></span></div>');
  }

    const hm = document.querySelector('.hamburger');
    function addClassHm() {
        this.classList.toggle("active");
    }

    hm.addEventListener('click', addClassHm);

  
});

$(document).on('scroll',function() {

  if($(window).scrollTop() >= 15) {
    $('.header').addClass('fixed').removeClass('search');
  } else if ($(window).scrollTop() <= 14) {
    $('.header').removeClass('fixed').css('background','transparent');
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

