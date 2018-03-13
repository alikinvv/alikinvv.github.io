var xStart, yStart = 0;

document.addEventListener('touchstart',function(e) {
    xStart = e.touches[0].screenX;
    yStart = e.touches[0].screenY;
});

document.addEventListener('touchmove',function(e) {

    var xMovement = Math.abs(e.touches[0].screenX - xStart);
    var yMovement = Math.abs(e.touches[0].screenY - yStart);
    if((yMovement * 3) > xMovement) {
        e.preventDefault();
    }
});

var arraylike = document.getElementsByClassName('order-list');
var containers = Array.prototype.slice.call(arraylike);
var drake = dragula({ 
    containers: containers,
    moves: function (el, container, handle) {
        return handle.classList.contains('dragging');
    },
    mirrorContainer: document.body
});


    drake.on('drag', function(el) {

        // add 'is-moving' class to element being dragged
        el.classList.add('is-moving');
    })
    .on('dragend', function(el) {

        // remove 'is-moving' class from element after dragging has stopped
        el.classList.remove('is-moving');

        // add the 'is-moved' class for 600ms then remove it
        window.setTimeout(function() {
            el.classList.add('is-moved');
            window.setTimeout(function() {
                el.classList.remove('is-moved');
            }, 600);
        }, 100);
    });


var createOptions = (function() {
    var dragOptions = document.querySelectorAll('.drag-options');

    // these strings are used for the checkbox labels
    var options = ['Research', 'Strategy', 'Inspiration', 'Execution'];

    // create the checkbox and labels here, just to keep the html clean. append the <label> to '.drag-options'
    function create() {
        for (var i = 0; i < dragOptions.length; i++) {

            options.forEach(function(item) {
                var checkbox = document.createElement('input');
                var label = document.createElement('label');
                var span = document.createElement('span');
                checkbox.setAttribute('type', 'checkbox');
                span.innerHTML = item;
                label.appendChild(span);
                label.insertBefore(checkbox, label.firstChild);
                label.classList.add('drag-options-label');
                dragOptions[i].appendChild(label);
            });

        }
    }

    return {
        create: create
    }


}());

var showOptions = (function () {

    // the 3 dot icon
    var more = document.querySelectorAll('.drag-header-more');

    function show() {
        // show 'drag-options' div when the more icon is clicked
        var target = this.getAttribute('data-target');
        var options = document.getElementById(target);
        options.classList.toggle('active');
    }


    function init() {
        for (i = 0; i < more.length; i++) {
            more[i].addEventListener('click', show, false);
        }
    }

    return {
        init: init
    }
}());

createOptions.create();
showOptions.init();










$( document ).ready(function() {

    console.log($('.order-list').find('li').length);

    $('.payment-type label').on('click',function () {
        $('.payment-type label').removeClass('checked');
        $(this).addClass('checked');
    });


    /* смена состояний списка заказов при нажатии */
    $('.order-list .order-name').on('click',function () {
        var item = $(this).parent();
        if($(item).hasClass('order-cooking') && $('.content').hasClass('orders-page')) {
            $(item).addClass('delivered');
            $(item).find('.progress').hide();
            $(item).find('.icon-camera').hide();
        } else if ($('.content').hasClass('orders-page')) {
            $(item).toggleClass('order-cooking');
            $(item).find('.progress').show();
            $(item).find('.icon-camera').show();
        } else if ($(item).hasClass('order-cooking')) {
            $(item).toggleClass('order-cooking');
            $(item).find('.progress').hide();
            $(item).find('.icon-camera').hide();
        } else {
            $(item).toggleClass('order-cooking');
            $(item).find('.progress').show();
            $(item).find('.icon-camera').show();
        }
    })

    $('.edit-menu li span:not(.icon-camera)').on('click',function () {
        $(this).parent().toggleClass('select-item');
    })



    /*  Окно "Редактирование заказа" */
    var activeOrder;
    $('.btn-edit').on('click ', function () {
        activeOrder = $(this).parent().parent().offset().left;
        $(this).parent().parent().addClass('active-order front');
        $(this).parent().parent().css('position','absolute');
        $(this).parent().parent().next('.order').addClass('next-order');
        $('.next-order').css('margin-left','247px');
        $(this).parent().parent().css('left',activeOrder+'px');
        $(this).parent().parent().animate({left:'110px'});

        $(this).addClass('disable');

        $(this).parent().parent().find('li:not(.order-cooking,.order-overdue) .icon-dots-08').fadeIn().css("display","inline-block");
        $(this).parent().parent().find('li:not(.order-cooking,.order-overdue) .icon-close.order-close').fadeIn().css("display","inline-block");

        $('.order-edit').show();
        $('.check').animate({top: '15px'});
        $('.order-edit,.calculator').animate({top: '15px'},1);
        $('.calculator').fadeIn().css("display","inline-block");
        $('.order:not(.active-order,.check),.bottom-bar').fadeOut().css("display","none");
    })

    $('.active-order li.order-cooking span').on('click touchstart',function () {
        $(this).css('pointer-events','none');
    })

    /* Закрытие окна "Редактирование заказа" */
    $('.order-edit .icon-close').on('click touchstart', function () {
        $('.active-order').find('.icon-dots-08').fadeOut().css("display","none");
        $('.active-order').find('.icon-close.order-close').fadeOut().css("display","none");

        $('.active-order').animate({left: activeOrder+'px'});
        setTimeout(function () {
            $('.active-order').css('position','relative').css({left:'initial'}).removeClass('active-order');
            $('.next-order').css('margin-left','initial').removeClass('next-order');
        },430)

        $('.btn-edit').removeClass('disable');

        $('.order-edit, .calculator').animate({top: '780px'},0);
        $('.check').fadeOut().css("display","none").animate({top: '780px'},0);
        setTimeout(function () {
            $('.order-edit,.calculator').hide();
        },200)

        setTimeout(function () {
            $('.order:not(.active-order,.check),.bottom-bar').fadeIn().css("display","inline-block");
        },100)

    })

    /* Окно "Оплата заказа" */
    $('.order .btn-danger:not(.paid)').on('click touchstart', function () {
        $('.order:not(.active-order,.check),.bottom-bar').fadeOut();

        $('.active-order').find('.icon-dots-08').fadeOut().css("display","none");
        $('.active-order').find('.icon-close.order-close').fadeOut().css("display","none");

        $('.btn-edit').removeClass('disable');

        setTimeout(function () {
            $('.order:not(.active-order,.check),.bottom-bar').css("display","none");
        },600)
        $('.calculator,.check').fadeIn(0).css("display","inline-block").removeClass('flip').animate({top: '15px'});

        /* Оплата заказа в окне редактирования меню */
        if($('.order').hasClass('active-order')) {
            $('.order-edit').removeClass('front').addClass('flip back').animate({top: '780px'}).fadeOut(100).css("display","none");
            setTimeout(function () {
                $('.order-edit').removeClass('flip back').addClass('front');
            },800)
            $('.calculator').removeClass('flip back').addClass('front');

            $('.active-order').removeClass('front').addClass('flip back').fadeOut(100).css("display","none");
            setTimeout(function () {
                $('.active-order').css('position','relative').css({left:'initial'}).removeClass('active-order flip back front');
                $('.next-order').removeClass('next-order').css('margin-left','initial');
            },200)
            $('.check').fadeIn().css("display","inline-block").addClass('front').removeClass('flip back');
        }
    })

    // Закрытие окна "Оплата заказа"
    $('.calculator .icon-close').on('click touchstart', function () {
        $('.take-order').removeClass('form--no');
        $('.calculator').animate({top: '780px'},0).removeClass('front');
        setTimeout(function () {
            $('.calculator').addClass('flip back')
            $('.calculator form').css('opacity','1');
            $('.check-ok').fadeOut();
        },800)

        $('.check').animate({top: '780px'},0);
        setTimeout(function () {
            $('.check').hide().addClass('flip');
            $('.calculator').hide();
        },800)
        $('.order:not(.check),.bottom-bar').fadeIn();
        setTimeout(function () {
            $('.order:not(.check),.bottom-bar').css("display","inline-block");
        },600)

        $('.made input').val('0');
    })

    /* Подтверждение заказа */
    $('.take-order').on('click touchstart',function (e) {
        e.preventDefault();
        if($('.made input').val() == '0') {
            $('.take-order').addClass('form--no');
        } else {
            $('.calculator form').animate({opacity: '0'});
            $('.check-ok').fadeIn();
        }
    })

    /* Счет */
    $('.numbers button:not(.sum)').on('click touchstart',function (e) {
        e.preventDefault();
        $('.made input').val(parseInt($('.made input').val() + $(this).text()));
    })
    $('.numbers .preset button').on('click touchstart',function (e) {
        e.preventDefault();
        $('.made input').val(parseInt($('.made input').val()) + parseInt($(this).text()));
    })
    $('.numbers button.clear').on('click touchstart',function (e) {
        e.preventDefault();
        $('.made input').val('0');
    });
    $('.payment-type input').on('click touchstart',function (e) {
        e.preventDefault();
        $('.payment-type label').removeClass('checked');
        $(this).parent().addClass('checked');
    });

    $(".fancybox").fancybox({
        padding: 0,
        arrows : false
    });

});