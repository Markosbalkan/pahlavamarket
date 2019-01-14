$(function () {

  // Header cart
  const countProd = $('#header__count-prod'),
    objWin = $(window),
    mobBtnColl = $('.header__btn-coll'),
    mainSlider = $('.main-slider__inner'),
    slidNameProd = $('.main-slider__name-prod'),
    paginItem = $('.pagination__item');


  $(countProd).on('click', function () {
    $('.header__cart-inner').toggleClass('header__cart-inner--open');
  });

  $(mobBtnColl).on('click', function (e) {
    if (e.target.closest('.header__pop-info-phone')) return;
    $('.header__pop-info-phone').toggleClass('header__pop-info-phone--open');

    if (document.querySelector('.header__pop-info-phone--open'))
      $(this).find("img").attr('src', 'img/close-phone-btn.svg');
    else
      $(this).find("img").attr('src', 'img/icon-phone-mob.svg');
  });

  objWin.on('scroll', function () {
    if ($(this).scrollTop() > 0 && $(this).width() > 992) {
      $('.header').addClass('header--scroll');
    } else {
      $('.header').removeClass('header--scroll');
    }
  });


  // Slider main
  
  $(mainSlider).on('init', function(event){
    writeCaption();
  });

  $(mainSlider).on('setPosition', function(){
    writeCaption();
  })

  $(mainSlider).slick({
    slideToShow: 1,
    dots: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    draggable: false,
    touchMove: false,
    dotsClass: 'main-slider__nav',
    prevArrow: '<button class="main-slider__btn-nav main-slider__btn-nav--prev" type="button"><img src="/app/img/btn-prev.svg" alt=""></button>',
    nextArrow: '<button class="main-slider__btn-nav main-slider__btn-nav--next" type="button"><img src="/app/img/btn-next.svg"></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false
        }
      }
    ]
  });


  function writeCaption() {
    let elemNav = $('.main-slider__nav').find('li button');
    for (let i = 0; i < $(slidNameProd).length; i++) {
      let nameProd = $(slidNameProd).eq(i).text().split(' ');
      let firstWord = nameProd[0];
      $(elemNav).eq(i).html('<p>'+firstWord+'</p>'+nameProd[1]);
    }
  }


  // Pagination
  paginItem.on('click', function(e){
    paginItem
      .removeClass('pagination__item--active')
      .eq($(this).index())
      .addClass('pagination__item--active');

    e.preventDefault();
  });



})