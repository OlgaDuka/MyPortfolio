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
    var tiles = document.querySelectorAll('.tile');

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
        $('.scroll--up').fadeIn();
      } else {
        $('.scroll--up').fadeOut();
      }
    });
    // Первый активный пункт меню после главной страницы
    $('.scroll__down').bind('click', function () {
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
    // Переключаем анимацию на tile
    var onTileMouseover = function (evt) {
      evt.currentTarget.classList.add('animated');
      evt.currentTarget.classList.add('flash');
    };

    var onTileMouseout = function (evt) {
      evt.currentTarget.classList.remove('animated');
      evt.currentTarget.classList.remove('flash');
    };

    // Добавляем событие ховера на все tile
    [].forEach.call(tiles, function (element) {
      element.addEventListener('mouseover', onTileMouseover);
      element.addEventListener('mouseout', onTileMouseout);
    });

    // ----------------------------------------------
    // WOW - обеспечивает анимацию при скроллинге
    // ----------------------------------------------
    var wow = new window.WOW();
    wow.mobile = false;
    wow.init();
  });
})(jQuery);
