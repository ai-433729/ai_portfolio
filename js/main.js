
//bubbly
bubbly({
    background: (ctx) => {
        const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height);
        gradient.addColorStop(0, "#abd9e7");
        gradient.addColorStop(1, "#dbb2f7");
        return gradient;
    },
    bubbles: {
        fill: () => `hsla(${Math.random() * 360}, 100%, 50%, ${Math.random() * 0.07})`,
        shadow: () => ({blur: 20, color: "#ffffff7e"})
    }
});

//WORKSnav内クリックの遷移
document.querySelectorAll('#pc-nav a, #sp-nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    //リンク先のハッシュ（#web, #bnr, #other）を取得
    const targetId = this.getAttribute('href').replace('#', '');

    //対象となるラジオボタンを取得
    const targetRadio = document.getElementById(targetId);
    
    if (targetRadio && targetRadio.type === 'radio' && targetRadio.name === 'filter') {
      //ラジオボタンをチェック状態にする
      targetRadio.checked = true;
      
      const worksSection = document.getElementById('works');
      if (worksSection) {
        e.preventDefault(); 
        worksSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

//header-animation
$(function(){
  $(window).on('scroll', function(){
    let y = $(window).scrollTop();
    let mv = $('.main-visual-container');

    // 要素が存在する場合のみ高さを取得
    if (mv.length) {
      // メインビジュアルの高さから50px引いた値
      let triggerPoint = mv.outerHeight() - 50;

      if(y > triggerPoint){
        $('#pc-nav, .sp-header').addClass('scroll');
        $('.drop-menu').addClass('scroll-drop-menu');
        $('.drop-menu-inner').addClass('scroll-drop-menu-inner');
      } else {
        $('#pc-nav, .sp-header').removeClass('scroll');
        $('.drop-menu').removeClass('scroll-drop-menu');
        $('.drop-menu-inner').removeClass('scroll-drop-menu-inner');
      }
    }
  });
});


//h1-animation
const CLASSNAME = "-visible";
const $target = $(".main-title-txt");
$(document).ready(function() {
  // ページ読み込みから少し遅らせてアニメーションを開始
  setTimeout(() => {
    $target.addClass(CLASSNAME);
  }, 600); // 0.6秒後に表示
});

//mixitup
let mixer = mixitup('.filter-wrapper');

//scroll-animation
const wrapper = document.querySelector(".js-zoom-fixed-animation");
const container = wrapper.querySelector(".bg-zoom-container");
const mask = wrapper.querySelector(".mask");
const img = wrapper.querySelectorAll(".img");
// スクロールに応じてマスクのサイズを広げる
gsap.fromTo(
  mask,
  {
    width: "20%",
  },
  {
    width: "100%",
    height: () => window.innerHeight + "px",
    scrollTrigger: {
      trigger: container,
      endTrigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,
      invalidateOnRefresh: true,
    },
  }
);
// スクロールに応じて画像のサイズを縮小
gsap.fromTo(
  img,
  { scale: 2 },
  {
    scale: 1,
    scrollTrigger: {
      trigger: container,
      endTrigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,
      invalidateOnRefresh: true,
    },
  }
);


//timeline
(function(){
  "use strict";

  var items = document.querySelectorAll(".timeline li");

  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add("in-view");
      }
    }
  }

  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);
})();

//ham-btn
$(function(){

  $('#ham-btn').on('click',function(){
    $(this).toggleClass('is-active');
    $('#sp-nav').fadeToggle();
  });

  $('#sp-nav a').on('click',function(){
    $('#ham-btn').removeClass('is-active');
    $('#sp-nav').fadeOut();
  });
});

//contact
$(function(){

$('#name,#email,#messege,textarea').on('focusin', function() {
  $(this).prev('label').addClass('active');
});

$('#name,#email,#messege,textarea').on('focusout', function() {
  if (!this.value) {
    $(this).prev('label').removeClass('active');
  }
});

// ページ読み込み時に値が入っていたらラベルを浮かせる
  $('#name, #email, #messege').each(function() {
    if ($(this).val() !== "") {
      $(this).prev('label').addClass('active');
    }
  });

//googleformへのページ遷移をキャンセル
$('#g-form').submit(function (event) {
  event.preventDefault();

  //ブラウザのバリデーションチェック
  if (!this.checkValidity()) {
    return false; 
  }

  $('.submit-btn').css({'opacity': '0', 'pointer-events': 'none'});
  $('.thx-txt').addClass('is-active');

  //Googleフォームへの送信
  const $form = $(this);
  $.ajax({
    url: $form.attr('action'),
    data: $form.serialize(),
    type: 'POST',
    dataType: 'xml',
    statusCode: {
      0: function() { console.log("Success"); },
      200: function() { console.log("Success"); }
    }
  });
  });
});
