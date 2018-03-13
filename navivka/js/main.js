$(document).ready(function () {

    /* back to top button */

    var amountScrolled = 1000;
    var amountScrolledNav = 25;

    $(window).scroll(function() {
    if ( $(window).scrollTop() > amountScrolled ) {
        $('.back-to-top').addClass('show');
    } else {
        $('.back-to-top').removeClass('show');
    }
    });

    $('.back-to-top').click(function() {
    $('html, body').animate({
        scrollTop: 0
    }, 800);
    return false;
    });

    // Add waves effect
    Waves.attach('.back-to-top', 'waves-effect');
    Waves.init();

  /* main menu */
  var $activeNav;
  var hashUrl = window.location.hash;
  $('.menu a[href^="#"]').on('click',function (e) {
      $(this).parent().addClass('active');
      $activeNav = $(this).parent();
      e.preventDefault();
      var target = this.hash;
      $target = $(target);
      $('html, body').stop().animate({
          'scrollTop':  $target.offset().top - 80
      }, 900, 'swing', function () {
          window.location.hash = target;          
      });      
  });  



  $(document).bind('mousewheel', function(e){
      $('.menu li').removeClass('active');
  });

  $('.menu ul').on('mouseenter', function() {
    $activeNav = $('.menu li.active');
    $('.menu li').removeClass('active');
  });

  $('.menu ul').on('mouseleave', function() {
    $activeNav.addClass('active');
  });

  $('.menu a[href="'+ hashUrl +'"]').parent().addClass('active'); 


    /* panels */

    $('.panel-left').click(function() {
        if($('.panel-right').is('.active')) {
            $('.panel-right').toggleClass('active');
            $('.panel-left').toggleClass('back');
        } else {
            $(this).toggleClass('active');
            $('.panel-right').toggleClass('back');
        }
    });

    $('.panel-right').click(function() {
        if($('.panel-left').is('.active')) {
            $('.panel-left').toggleClass('active');
            $('.panel-right').toggleClass('back');
        } else {
            $(this).toggleClass('active');
            $('.panel-left').toggleClass('back');
        }
    });

    var mySwiper = new Swiper ('.swiper-container', {
        slidesPerView: 'auto',
        spaceBetween: 30,
        grabCursor: true,
        paginationClickable: true,
        freeMode: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev'
    })

    //маска для поля телефон
    $('input[name=phone]').mask('+X (000) 000-0000', {
        clearIfNotMatch: true,
        placeholder: '+7 (___) ___-____',
        translation: {
            'X': {
                pattern: /[7-8]/,
                fallback: '7'
            }
        }
    });

    /* скачки в хроме */
    //remove height property from file css because we will set it to first run of page
    //insert this snippet in a script after declarations of your scripts in your index
    var setHeight = function () {
        var h = $(window).height();
        $('.full-height').css('height', h);
    };

    setHeight(); // at first run of webpage we set css height with a fixed value

    if (typeof window.orientation !== 'undefined') { // this is more smart to detect mobile devices because desktop doesn't support this property
        var query = window.matchMedia("(orientation:landscape)"); //this is is important to verify if we put
        var changeHeight = function (query) { //mobile device in landscape mode
            if (query.matches) { // if yes we set again height to occupy 100%
                setHeight(); // landscape mode
            } else { //if we go back to portrait we set again
                setHeight(); // portrait mode
            }
        }
        query.addListener(changeHeight); //add a listner too this event
    } else { //desktop mode                                       //this last part is only for non mobile
        $(window).resize(function () { // so in this case we use resize to have
            setHeight(); // responsivity resisizing browser window
        });
    }

    $('.menu').sticky({topSpacing:0});

    $("a[href='#one']").on('shown.bs.tab', function(){
      google.maps.event.trigger(map, 'resize');
      map.setCenter({lat: 57.999823, lng: 56.264082});
    });
    $("a[href='#two']").on('shown.bs.tab', function(){
      google.maps.event.trigger(mapTeralink, 'resize');
      mapTeralink.setCenter({lat: 55.676952, lng: 37.560103});
    });

});


    /* maps */
var map,mapTeralink;
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
      center: new google.maps.LatLng(57.999823, 56.264082),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      zoomControl: true,
      styles: styles
    };

    var teralinkOptions = {
      center: new google.maps.LatLng(55.676952, 37.560103),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      zoomControl: true,
      styles: styles
    };

    map = new google.maps.Map(document.getElementById("incabmap"), mapOptions);
    mapTeralink = new google.maps.Map(document.getElementById("teralinkmap"), teralinkOptions);


    var markerIncab = new google.maps.Marker({
        position: {lat: 57.999823, lng: 56.264082},
        map: map,
        title: 'Инкаб'
    });

    var markerTeralink = new google.maps.Marker({
        position: {lat: 55.676952, lng: 37.560103},
        map: mapTeralink,
        title: 'Тералинк'
    });

}

// add window listener for GMaps
google.maps.event.addDomListener(window, 'load', initialize);

