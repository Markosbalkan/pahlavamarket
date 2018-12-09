$(function () {

  // Header cart
  const countProd = $('#header__count-prod'),
        objWin = $(window),
        mobBtnColl = $('.header__btn-coll');

  $(countProd).on('click', function() {
    $('.header__cart-inner').toggleClass('header__cart-inner--open');
  });

  $(mobBtnColl).on('click', function(e) {
    if (e.target.closest('.header__pop-info-phone')) return;
    $('.header__pop-info-phone').toggleClass('header__pop-info-phone--open');
    
    if (document.querySelector('.header__pop-info-phone--open')) 
      $(this).find("img").attr('src', 'img/close-phone-btn.svg');
    else 
      $(this).find("img").attr('src', 'img/icon-phone-mob.svg');
    
  });

  objWin.on('scroll', function() {
    
    if ($(this).scrollTop() > 0 && $(this).width() > 992) {
      $('.header').addClass('header--scroll')
    } else {
      $('.header').removeClass('header--scroll');
    }

  })





})