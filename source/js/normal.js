// 프린트(print) 이벤트
function printPage() {
  window.print();
}

/**
 * [메인] 홍보영상 슬라이드
 */
const mainPromotionSl = () => {
  var $mainPromotionSl = $(".main-promotion-sl");

  $mainPromotionSl.slick({
    arrows:true,
    dots: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    pauseOnFocus: false,
    variableWidth: false,
  }).on('init', function (event, slick) {

  }).on('beforeChange', function (event, slick, currentSlide, nextSlide, prevSlide) {
    ctStop();
  }).on('afterChange', function (event, slick, currentSlide, nextSlide, prevSlide) {
    ctStart();
  });

  ctStart();

  function ctStart(){
    $('.main-promotion-bar p span').animate({
      'width': '100%'
    }, 4000, 'linear');
  }

  function ctStop(){
    $('.main-promotion-bar p span').stop().css({
      'width': '0'
    });
  }

  let stopBtn = document.querySelector('.main-promotion-pause');
  let imgTag = document.querySelector('.main-promotion-pause img');

  stopBtn.addEventListener('click', function(){
    if(stopBtn.classList.contains('pause')){
      stopBtn.classList.remove('pause');
      $mainPromotionSl.slick('slickPlay');
      imgTag.src = './source/img/main-promotion-pause.png';
      ctStart();
    }else{
      stopBtn.classList.add('pause');
      $mainPromotionSl.slick('slickPause');
      imgTag.src = './source/img/main-promotion-play.png';
      ctStop();
    }
  });

  //control
  let main_promotion_prev = $('.main-promotion-btn-wrap').find('.main-promotion-prev'),
  main_promotion_next = $('.main-promotion-btn-wrap').find('.main-promotion-next'),
  main_promotion_prev_tg = $mainPromotionSl.find('.slick-prev'),
  main_promotion_next_tg = $mainPromotionSl.find('.slick-next');

  // >> prev, next
  main_promotion_prev.on('click', function () {
    main_promotion_prev_tg.trigger('click');
  });
  main_promotion_next.on('click', function () {
    main_promotion_next_tg.trigger('click');
  });
}

/**
 * [공통] GNB 메뉴 마우스 오버
 */
const gnbOver = () => {
  let depth1 = $('.gnb-ul').children('li');

  depth1.on('mouseover',function(){
    $(this).find('.snb').stop().slideDown();
  });

  depth1.on('mouseout',function(){
    $(this).find('.snb').stop().slideUp();
  });
}

/**
 * [공통] 고정메뉴 및 탑버튼 function
 */
const fixMenu = () => {
  let fixMenuWrap = $('.fix-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      fixMenuWrap.fadeIn();
    } else {
      fixMenuWrap.fadeOut();
    }
  });

  $('.fix-menu .top-btn').on('click', () => {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  });
}

/**
 * [공통] 풀다운메뉴
 */
const fullMenu = () => {
  let fullMenuBtn = $('.all-menu'),
      fullMenuWrap = $('.full-menu');

  $(window).resize(function(){
    fullMenuBtn.removeClass('active');
    fullMenuWrap.removeClass('active').slideUp();

    let width = window.innerWidth;
    if(width > 1280){
      fullMenuWrap.addClass('pc').removeClass('mo');
      fullMenuBtn.on('click', () => {
        fullMenuBtn.toggleClass('active');
        fullMenuWrap.toggleClass('active').slideToggle();
      });
    } else {
      fullMenuWrap.addClass('mo').removeClass('pc');
      fullMenuBtn.on('click', () => {
        fullMenuBtn.toggleClass('active');
        fullMenuWrap.toggleClass('active');
        $('html, body').toggleClass('scrollLock');
      });
    }
  }).resize();
}

/**
 * [공통] 모바일메뉴
 */
const mobileMenu = () => {
  let menuLink = $('.full-menu-title');
  	
  menuLink.on('click', function() {
    $(this).parent('.full-menu-inner').toggleClass('active');
    $(this).siblings('.full-menu-list').toggle();
  });
}

/**
 * [이전포럼] 행사갤러리 팝업
 */
const popup = () => {
  let gallery = $('.gallery-link'),
      popupWrap = $('#popup'),
      popupImg = $('#popup-img');

  gallery.on('click', function() {
    let src = $(this).find('img').attr('src');
    popupWrap.append(
      $('<img>').attr({'src': src, 'id':'popup-img'})
    ).animate({opacity:'show'}, 300);

    popupImg.on('load', function () {
      let documentHeight = popupWrap.height();
      let imgHeight = popupImg.height();
      popupImg.css('margin-top', (documentHeight - imgHeight) / 2);
    });			
  });

  popupWrap.on('click', function() {
    $(this).hide();
    popupWrap.find('img').remove();
  });
}

// Document ready Function
$(document).ready(function(){
  gnbOver();    // [공통] GNB 메뉴 마우스 오버
  fixMenu();    // [공통] 고정메뉴 및 탑버튼 function
  fullMenu();   // [공통] 풀다운메뉴
  mobileMenu(); // [곧통] 모바일메뉴
  // mainPromotionSl(); // [메인] 홍보영상 슬라이드
  popup();      // [이전포럼] 행사갤러리 팝업
});