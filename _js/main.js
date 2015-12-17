pjax = require('pjax');

if (pjax.isSupported !== undefined && pjax.isSupported()) {
  new pjax({
    elements: "a.js-pjax",
    selectors: ["title", "meta", '.layout', '.end-body-scripts']
  })
}

$(document).on('ready pjax:complete', function(){

  // toggle mobile menu
  $('.js-mobile-menu').on('click', function(e) {
    e.preventDefault();
    $('html').removeClass('mobile-menu-hidden');
    $('.layout').toggleClass('is-open');
  });

  // particle hero effect
  if (document.getElementById('phero')) {
    particleground(document.getElementById('phero'), {
      dotColor: "rgba(255, 255, 255, .4)",
      lineColor: "rgba(255, 255, 255, .12)",
      parallaxMultiplier: 20,
      curvedLines: false,
      particleRadius: 4,
      lineWidth: .5,
      density: 8000, // higher = less
      maxSpeedX: .4,
      maxSpeedY: .4
    });
  }
});
