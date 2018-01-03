'use strict';
(function ($) {
// Preloader - анимация, пока ждем загрузку страницы (шрифты, скрипты и т.д.)
  $(window).load(function () {
    $('.status').fadeOut();
    $('.preloader').delay(300).fadeOut('slow');
  });

  $(document).ready(function () {
    var toggle = document.querySelector('.navbar__toggle');
    var menu = document.querySelector('.navbar__list');
    var menuItems = menu.querySelectorAll('.navbar__item');

    // ----------------------------------------------
    // "Мягкий" скроллинг при нажатии на пункт меню или кнопки перехода
    // ----------------------------------------------

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
    // Первый активный пункт меню после главной страницы
    $('.scroll-down').bind('click', function () {
      menuItems[1].classList.add('navbar__item--active');
    });

    // ----------------------------------------------
    // Меню
    // ----------------------------------------------

    // Садим меню на стикер вверху экрана
    $('.header').sticky({topSpacing: 0});

    // Закрываем меню, если JS работает
    menu.classList.remove('navbar__list--nojs');
    menu.classList.add('navbar__list--close');
    // Переключаем состояние меню по кнопке
    toggle.addEventListener('click', function () {
      menu.classList.toggle('navbar__list--close');
    });

    // Переключаем активный пункт меню и закрываем меню, если оно выпадающее
    var onMenuItemClick = function (evt) {
      [].forEach.call(menuItems, function (element) {
        element.classList.remove('navbar__item--active');
      });
      evt.target.classList.add('navbar__item--active');
      menu.classList.add('navbar__list--close');
    };
    // Добавляем событие клика на пункты меню
    [].forEach.call(menuItems, function (element) {
      element.addEventListener('click', onMenuItemClick);
    });

    // ----------------------------------------------
    // Эффект параллакса на домашней странице
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
    // Эффекты для раздела "Технологии"
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
