"use strict";

// --- BUTTON
var $ = function $(s) {
  var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return o.querySelector(s);
};

var $$ = function $$(s) {
  var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return o.querySelectorAll(s);
};

$$('.button').forEach(function (el) {
  return el.addEventListener('mousemove', function (e) {
    var pos = this.getBoundingClientRect();
    var mx = e.clientX - pos.left - pos.width / 2;
    var my = e.clientY - pos.top - pos.height / 2;
    this.style.transform = 'translate(' + mx * 0.15 + 'px, ' + my * 0.3 + 'px)';
    this.style.transform += 'rotate3d(' + mx * -0.1 + ', ' + my * -0.3 + ', 0, 12deg)';
    this.children[0].style.transform = 'translate(' + mx * 0.025 + 'px, ' + my * 0.075 + 'px)';
  });
});
$$('.button').forEach(function (el) {
  return el.addEventListener('mouseleave', function () {
    this.style.transform = 'translate3d(0px, 0px, 0px)';
    this.style.transform += 'rotate3d(0, 0, 0, 0deg)';
    this.children[0].style.transform = 'translate3d(0px, 0px, 0px)';
  });
}); // --- CURSOR

document.addEventListener('mousemove', function (e) {
  $('.cursor').style.left = e.pageX - 25 + 'px';
  $('.cursor').style.top = e.pageY - 25 + 'px';
});