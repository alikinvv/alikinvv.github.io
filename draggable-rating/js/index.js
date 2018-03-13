jQuery.fn.cssNumber = function(prop){
    var v = parseInt(this.css(prop),10);
    return isNaN(v) ? 0 : v;
};

$('.star').draggable( {
    drag: function(){
      var offset = $(this).offset();
      var xPos = offset.left;
      var yPos = offset.top;
      $('#posX').text('x: ' + xPos);
      $('#posY').text('y: ' + yPos);
    },
    stop: function() {
     if($(this).cssNumber('left') <= -55) {
        $(this).animate({
         left: '-69px',
         top: '0'
       })
     } else {
       console.log($(this).cssNumber('left'));
       $(this).animate({
         left: '0',
         top: '0'
       })
     }
    }
  });