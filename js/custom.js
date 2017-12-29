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
      $('html, body').stop().animate({
        scrollTop: $(anchor.attr('href')).offset().top
      }, 1000);
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


    /* ---------------------------------------------- /*
    * Инструменты
    /* ---------------------------------------------- */

    $('.skills').waypoint(function () {
      $('.chart').each(function () {
        $(this).easyPieChart({
          size: 150,
          animate: 3000,
          scaleColor: false,
          barColor: '#2A3748',
          trackColor: 'transparent',
          lineWidth: 10
        });
      });
    }, {offset: '80%'});

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

    // ----------------------------------------------
    // WOW - обеспечивает анимацию при скроллинге
    // ----------------------------------------------
    var wow = new window.WOW();
    wow.init();

    // ----------------------------------------------
    // Форма контакта с использованием ajax
    // ----------------------------------------------

    $('#contact-form').submit(function (e) {

      e.preventDefault();

      var cName = $('.c_name').val();
      var cEmail = $('.c_email').val();
      var cMessage = $('.c_message ').val();
      var response = $('.contact-form .ajax-response');

      var formData = {
        'name': cName,
        'email': cEmail,
        'message': cMessage
      };

      if ((cName === '' || cEmail === '' || cMessage === '')) {
        response.fadeIn(500);
        response.html('<i class="fa fa-warning"></i> Что-то пошло не так. Попробуйте еще раз.');
      } else {
        $.ajax({
          type: 'POST',
          url: 'contact.php',
          data: formData,
          dataType: 'json',
          encode: true,
          success: function (res) {
            var ret = $.parseJSON(JSON.stringify(res));
            response.html(ret.message).fadeIn(500);
          }
        });
      }
      return false;
    });

  });

})(jQuery);
