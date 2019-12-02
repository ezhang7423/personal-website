(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav'
  });

  $(window).on('load', function() {
    $("body").addClass('loaded');
  });

})(jQuery); // End of use strict


// make audio work
  
    function playSound(el, soundfile) {
      if (el.mp3) {
        if (el.mp3.paused) el.mp3.play();
        else el.mp3.pause();
      } else {
        el.mp3 = new Audio(soundfile);
        el.mp3.play();
      }
    }

//show diff tabs
var currentTab = 1;
showTab(currentTab)

function showTab(n) {
  let tabs = document.getElementsByClassName("tab")
  for (i = 0; i < tabs.length; i++){
    (i !== n) ? tabs[i].style.display = "none" : tabs[i].style.display= "block"
  }
}

