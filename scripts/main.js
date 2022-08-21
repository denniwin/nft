//для меню
let coll = document.getElementsByClassName("collapsible");

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

//Плавный скролл
$('a[href^="#"').on("click", function () {
  let href = $(this).attr("href");
  if (href != "#") {
    $("html, body").animate({
      scrollTop: $(href).offset().top - 150,
    });
  } else return false;
});

let card__nick, card__price;

//Добавить нфт в форму
$(".card__link").on("click", function () {
  $("html, body").animate({
    scrollTop: $("#feedback__title").offset().top,
  });
  card__nick = $(this).parent().find(".card__nick").text();
  card__price = $(this).parent().find(".card__price").attr("value");
  $("#feed__back_tiker").val(card__nick);
  $("#feed__back_words").val(card__price);
});

//Запрос текущей стоимости крипты
$.get(
  "https://production.api.coindesk.com/v2/tb/price/ticker?assets=BTC,ETH,ETC",
  function (data) {
    priceBtc = data.data.BTC.ohlc.c.toFixed(2);
    priceEth = data.data.ETH.ohlc.c.toFixed(2);
    priceEtc = data.data.ETC.ohlc.c.toFixed(2);
  }
);

// Отправка данных
$(function ($) {
  $("#feed__back_send").click(function (e) {
    e.preventDefault();
    feedback__name = $("#feed__back_name").val();
    feedback__tel = $("#feed__back_number").val();
    feedback__tiker = $("#feed__back_tiker").val();
    feedback__words = $("#feed__back_words").val();
    feedback__crypto = `The cost of your ${card__nick} in BTC: ${(
      card__price / priceBtc
    ).toFixed(4)}, ETH: ${(card__price / priceEth).toFixed(4)}, ETC: ${(
      card__price / priceEtc
    ).toFixed(4)}`;

    if (!feedback__name) {
      spop({
        template: "Please add your name",
        position: "bottom-right",
        style: "warning",
        autoclose: 2500,
      });
    }

    if (!feedback__tel) {
      spop({
        template: "Please add your telephone",
        position: "bottom-right",
        style: "warning",
        autoclose: 2500,
      });
    }

    if (!feedback__tiker) {
      spop({
        template: "Please add your NFT",
        position: "bottom-right",
        style: "warning",
        autoclose: 2500,
      });
    } else {
      $.ajax({
        url: "https://nft.rfixit.ru/conf/telegram.php",
        method: "post",
        dataType: "html",
        data: {
          feedback__name,
          feedback__tel,
          feedback__crypto,
          feedback__words,
        },
        success: function (data) {
          if (data == "error") {
            alert("Не удалось отправить");
          } else {
            spop({
              template:
                '<h4 class="spop-title">Message sent to</h4><a href="https://t.me/+sC81hFOz7jk0MGEy">Telegram</a>',
              position: "bottom-right",
              style: "success",
              autoclose: 5000,
            });
          }
        },
      });
      $("#feed__back_name").val("");
      $("#feed__back_number").val("");
      $("#feed__back_tiker").val("");
      $("#feed__back_words").val("");
    }
  });
});

//Slider
const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  slidesPerView: 1,
  spaceBetween: 50,
  paginationClickable: 1,
  roundLengths: !0,
  loop: true,
  speed: 800,
  grabCursor: !0,
  freeMode: !1,
  centeredSlides: true,
  disableOnInteraction: true,
  autoplay: {
    delay: 2000,
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  mousewheel: {
    invert: true,
  },

  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },

  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    // when window width is >= 917px
    917: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
  },
});

// document.querySelectorAll('.header__logo').forEach((elem) => {

// 	elem.onmouseenter = elem.onmouseleave = (e) => {
//     console.log(elem)

// 		const tolerance = 10

// 		const left = 0
// 		const right = elem.clientWidth
//     console.log(e.pageX)
//     console.log(elem.offsetLeft)

// 		let x = e.pageX - elem.offsetLeft
//     console.log(x)
// 		if (x - tolerance < left) x = left
// 		if (x + tolerance > right) x = right
// 		elem.style.setProperty('--x', `${ x }px`)
//   }

// })
