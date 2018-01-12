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
    var tiles = document.querySelectorAll('.tile');
    // WOW - обеспечивает анимацию при скроллинге
    var wow = new window.WOW();
    wow.mobile = false;

    // ----------------------------------------------
    // "Мягкий" скроллинг при нажатии на пункт меню или кнопки перехода
    // ----------------------------------------------

    $(document).on('scroll', onScroll);
    // Садим меню на стикер вверху экрана
    $('.header').sticky({topSpacing: 0});

    // Функция для переключения активного пункта меню во время скроллинга
    var onScroll = function (evt) {
      var scrollPos = $(document).scrollTop() + 100;
      $('.navbar__item a').each(function () {
        evt.preventDefault();
        var currLink = $(this);
        var refElement = $(currLink.attr('href'));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
          $('.navbar__item a').removeClass('navbar__link--active');
          currLink.addClass('navbar__link--active');
        }
      });
    };

    $('a[href*=#]').on('click', function (e) {
      var anchor = $(this);
      $(document).off('scroll');

      $('.navbar__item a').each(function () {
        $(this).removeClass('navbar__link--active');
      });

      anchor.addClass('navbar__link--active');

      $('html, body').stop().animate({'scrollTop': $(anchor.attr('href')).offset().top}, 1000, function () {
        $(document).on('scroll', onScroll);
      });
    });

    // Анимация при скроллинге
    $('.scroll__down').bind('click', function () {
      wow.init();
    });

    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $('.scroll--up').fadeIn();
      } else {
        $('.scroll--up').fadeOut();
      }
    });

    // ----------------------------------------------
    // Меню
    // ----------------------------------------------

    // Закрываем меню, если JS работает
    menu.classList.remove('navbar__list--nojs');
    menu.classList.add('navbar__list--close');
    toggle.classList.remove('navbar__toggle--cross');
    // Переключаем состояние меню по кнопке
    toggle.addEventListener('click', function () {
      menu.classList.toggle('navbar__list--close');
      toggle.classList.toggle('navbar__toggle--cross');
    });

    // Закрываем меню, если оно выпадающее, переключаем вид кнопки
    var onMenuClick = function () {
      menu.classList.add('navbar__list--close');
      toggle.classList.toggle('navbar__toggle--cross');
    };

    // Добавляем событие клика на меню
    menu.addEventListener('click', onMenuClick);

    // ----------------------------------------------
    // Эффект параллакса на домашней странице
    // ----------------------------------------------

    $('.home__screen-height').height($(window).height());

    $(window).resize(function () {
      $('.home__screen-height').height($(window).height());
    });

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
      $('.home').css({'background-attachment': 'scroll'});
    } else {
      $('.home').parallax('50%', 0.1);
    }

    // ==================================================
    // Эффекты для раздела "Технологии"
    // ==================================================
    // Добавляем анимацию на tile по наведению мышки
    var onTileMouseover = function (evt) {
      evt.currentTarget.classList.add('animated');
      evt.currentTarget.classList.add('flash');
    };
    // Убираем анимацию, когда убираем мышку
    var onTileMouseout = function (evt) {
      evt.currentTarget.classList.remove('animated');
      evt.currentTarget.classList.remove('flash');
    };

    // Добавляем событие ховера на все tile
    [].forEach.call(tiles, function (element) {
      element.addEventListener('mouseover', onTileMouseover);
      element.addEventListener('mouseout', onTileMouseout);
    });
  });
})(jQuery);
