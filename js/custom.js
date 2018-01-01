'use strict';
(function ($) {
// Preloader
  $(window).load(function () {
    $('.status').fadeOut();
    $('.preloader').delay(300).fadeOut('slow');
  });

  $(document).ready(function () {

    /* ---------------------------------------------- /*
    * Smooth scroll / Scroll To Top
    /* ---------------------------------------------- */

    $('a[href*=#]').bind('click', function (e) {
      var anchor = $(this);
      wow.init();
      $('html, body').stop().animate({scrollTop: $(anchor.attr('href')).offset().top}, 1000);
      e.preventDefault();
    });

    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $('.scroll-up').fadeIn();
      } else {
        $('.scroll-up').fadeOut();
      }
    });

    /* ---------------------------------------------- /*
    * Navbar
    /* ---------------------------------------------- */

    $('.header').sticky({
      topSpacing: 0
    });

    $('body').scrollspy({
      target: '.navbar-custom',
      offset: 70
    });


    // ----------------------------------------------
    // Home BG
    // ----------------------------------------------

    $('.screen-height').height($(window).height());

    $(window).resize(function () {
      $('.screen-height').height($(window).height());
    });

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
      $('.home').css({'background-attachment': 'scroll'});
    } else {
      $('.home').parallax('50%', 0.1);
    }

    // ==================================================
    // Технологии
    // ==================================================
    $('.tile').bind('mouseover', function (e) {
      e.target.classList.add('animated');
      e.target.classList.add('swing');
      e.preventDefault();
    });
    $('.tile').bind('mouseout', function (e) {
      e.target.classList.remove('animated');
      e.target.classList.remove('swing');
      e.preventDefault();
    });

    // ----------------------------------------------
    // WOW - обеспечивает анимацию при скроллинге
    // ----------------------------------------------
    var wow = new window.WOW();
    wow.mobile = false;
    wow.init();
  });
})(jQuery);
