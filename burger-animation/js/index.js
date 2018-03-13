$('.menu').click(function() {
	if($(this).is('.active:not(.back)')) {
		 $(this).addClass('back');
	} else if ($(this).is('.back')) {
		$(this).removeClass('back');
	} else {
		$(this).addClass('active');
	}
});