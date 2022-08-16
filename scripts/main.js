//для меню
let coll = document.getElementsByClassName("collapsible");

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}

//Плавный скролл
$('a[href^="#"').on('click', function() {
  let href = $(this).attr('href');
  $('html, body').animate({
      scrollTop: $(href).offset().top
  });
  return false;
});

//Запрос тикеров
price()


//Вывод тикеров
const nameBtc = document.querySelector('#name__btc');
const nameEth = document.querySelector('#name__eth');
const nameEtc = document.querySelector('#name__etc');
const priceBtc = document.querySelector('#price__btc');
const priceEth = document.querySelector('#price__eth');
const priceEtc = document.querySelector('#price__etc');

function price()
{
  $.get('https://production.api.coindesk.com/v2/tb/price/ticker?assets=BTC,ETH,ETC',
    function(data) {
      btc = data.data.BTC.name
      eth = data.data.ETH.name
      etc = data.data.ETC.name
      nameBtc.textContent = btc
      nameEth.textContent = eth
      nameEtc.textContent = etc
      priceBtc.textContent = `${data.data.BTC.ohlc.c.toFixed(2)}$`
      priceEth.textContent = `${data.data.ETH.ohlc.c.toFixed(2)}$`
      priceEtc.textContent = `${data.data.ETC.ohlc.c.toFixed(2)}$`

})
}

  // Отправка данных
  $(function ($) {
    $("#feed__back_send").click(function (e) {
      e.preventDefault()
      // let self = $(this);
      // if ($(this).closest(".card").find(".valid_good").length < 2) {
      //   if (confirm("Карта не валидна, продолжить?")) {
      //     return
      //   }
      // }
      // self.parent().find(".button_settings").addClass("button_load");
      feedback__name = $('#feed__back_name').val();
      feedback__words = $('#feed__back_words').val();
      feedback__tel = $('#feed__back_number').val();
      feedback__crypto = $('#feed__back_tiker').val();
      $.ajax({
        url: "./conf/telegram.php",
        method: "post",
        dataType: "html",
        data: { feedback__name, feedback__tel, feedback__crypto, feedback__words },
        success: function (data) {
          if (data == "error") {
            alert("Не удалось отправить");
          } else alert("все хорошо");
        },
      });
    });
  });


  //Slider
  const swiper = new Swiper('.swiper', {
    direction: "horizontal",
    slidesPerView: 1,
    spaceBetween: 50,
    paginationClickable: 1,
    roundLengths: !0,
    loop:true,
    speed: 800,
    grabCursor: !0,
    freeMode: !1,
    centeredSlides:true,
    autoplay: {
      delay: 2000,
    },
  
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    mousewheel: {
      invert: true, 
    },
  
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
  
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 3,
        spaceBetween: 0
      }
    }
  
  })


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