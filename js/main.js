//переменные
let priceBtc = 100;
let priceEth = 100;
let priceEtc = 100
let feedback__crypto;
let listNft = {
  'Secret Stones': 743,
  'Nova Auroras': 1543,
  'Dose of Art': 432,
}


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
  if ($(href).length) {
    $('html, body').animate({
      scrollTop: $(href).offset().top - 150
  });
  } else return false
});


//Маска на форму номера телефона
$('#feed__back_number').mask('8 (999) 999-99-99');

//Маска на имя
$('#feed__back_name').on('input', function(){
	this.value = this.value.replace(/[^a-zа-яё\s]/gi, '');
});

//Запрета ввода всех символов в поле nft
$('#feed__back_tiker').on('input', function(){
  switch ($(this).val()) {
    case 'Dose of Art': $('#feed__back_nft_price').val(listNft["Dose of Art"]);
    break;
    case 'Nova Auroras': $('#feed__back_nft_price').val(listNft["Nova Auroras"]);
    break;
    case 'Secret Stones': $('#feed__back_nft_price').val(listNft["Secret Stones"]);
    break;
    default: $('#feed__back_nft_price').val('');
  }
});


//Добавить нфт в форму
$('.card__link').on('click', function() {
  $('html').animate({
    scrollTop: $('#feedback__title').offset().top
});
  card__nick = $(this).parent().find('.card__nick').text();
  card__price = $(this).parent().find('.card__price').attr('value');
  $('#feed__back_tiker').val(card__nick)
  $('#feed__back_nft_price').val(card__price)
});


// Показать/скрыть окно перехода в тг
$('#wrap__button_back').on('click', function() {
  $('.feedback__input').css("opacity", "1");
  $('#form__input2').css("display", "none");
});

//Импорт нфт из объекта
$(function ($) {
  for (let key in listNft) {
		$('#nfts, .form__input_search').append(`<option value="${key}" label="${key}"></option>`)
	}  
})

//Запрос текущей стоимости крипты (работает)
$.get('https://production.api.coindesk.com/v2/tb/price/ticker?assets=BTC,ETH,ETC',
  function(data) {
  priceBtc = data.data.BTC.ohlc.c.toFixed(2)
  priceEth = data.data.ETH.ohlc.c.toFixed(2)
  priceEtc = data.data.ETC.ohlc.c.toFixed(2)
  });



// Отправка данных
  $(function ($) {
    $(".feedback__input").on('submit', function (e) {
        e.preventDefault()
        feedback__name = $('#feed__back_name').val();
        feedback__tel = $('#feed__back_number').val();
        feedback__tiker = $('#feed__back_tiker').val();
        feedback__nft_price = $('#feed__back_nft_price').val();
        
        if (!feedback__name || feedback__name.length < 2) {

          spop({
            template: 'Please add your name',
            position: 'bottom-right',
            style: 'warning',
            autoclose: 2500
        });  }

        if (!feedback__tel) {
          spop({
            template: 'Please add your telephone',
            position: 'bottom-right',
            style: 'warning',
            autoclose: 2500
        });  }

        if (!feedback__tiker) {
          spop({
            template: 'Please add your NFT',
            position: 'bottom-right',
            style: 'warning',
            autoclose: 2500
        });  }


        

        if (feedback__name && feedback__tel && feedback__tiker && feedback__nft_price) {

          //Запрос котировок, не работает, спросить почему
          // $.ajax({
          //   url: 'https://production.api.coindesk.com/v2/tb/price/ticker?assets=BTC,ETH,ETC', 
          //   method: 'get',
          //   dataType: 'json',
          //   success: function(data){ 
          //     priceBtc = data.data.BTC.ohlc.c.toFixed(2)
          //     priceEth = data.data.ETH.ohlc.c.toFixed(2)
          //     priceEtc = data.data.ETC.ohlc.c.toFixed(2)
          //     console.log(priceBtc)
          //   },
          //   error: function (exception) {
          //     console.log(exception)
          //     if (exception === 'error' || exception === 'parsererror') {
          //       priceBtc = 20000
          //       priceEth = 1500
          //       priceEtc = 35  
          //     }
          // }
          // });
          //console.log(priceBtc) вот тут уже не видна переменная, хотя глобально обозначена.


          feedback__crypto = `The cost of your ${feedback__tiker} in <strong>BTC:</strong> ${(feedback__nft_price / priceBtc).toFixed(4)}, <i>ETH:</i> ${(feedback__nft_price / priceEth).toFixed(4)}, ETC: ${(feedback__nft_price / priceEtc).toFixed(4)}`;

          //Отправка в телеграм данных
          $.ajax({
            url: "https://nft.rfixit.ru/conf/telegram.php",
            method: "post",
            dataType: "html",
            data: {feedback__name, feedback__tel, feedback__crypto},
            success: function (data) {
              if (data == "error") { alert("Не удалось отправить") } 
              else {
                // location.assign('https://t.me/+sC81hFOz7jk0MGEy')
                // spop({
                // template: '<h4 class="spop-title">Message sent to</h4><a href="https://t.me/+sC81hFOz7jk0MGEy">Telegram</a>',
                // position: 'bottom-right',
                // style: 'success',
                // autoclose: 5000
                //     }); 
          }},
        })
        $(".feedback__input").trigger('reset');
        $('.feedback__input').css("opacity", "0");
        $('#form__input2').css("display", "block");
}
    });
  });


  //Отправка на почту


    $(".from__subscribe_button").on('click', function (e) {
      e.preventDefault()
      email = $('.form__input_subscribe').val().trim().replace(/ +/g, "");
      if (email.length > 4 && email.includes("@")) {
      $.ajax({
        url: "https://nft.rfixit.ru/conf/send.php",
        method: "post",
        dataType: "html",
        data: {email},
        success: function (data) {
          if (data == "error") {
            alert("Не удалось отправить");
          } else {
                spop({
                template: '<h4 class="spop-title">You subscribe now</h4>',
                position: 'bottom-right',
                style: 'success',
                autoclose: 5000
                    }); 
          }
        },
      })
      $('.form__input_subscribe').val('')
    } else {
      spop({
        template: '<h4 class="spop-title">Plese check your E-mail!</h4>',
        position: 'bottom-right',
        style: 'warning',
        autoclose: 3000
            }); 
    }

    });



  //Slider
  const swiper = new Swiper('.swiper', {
    direction: "horizontal",
    slidesPerView: 1,
    spaceBetween: 50,
    paginationClickable: 1,
    roundLengths: !0,
    loop: true,
    speed: 800,
    grabCursor: !0,
    freeMode: !1,
    centeredSlides:true,
    disableOnInteraction: true,
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

  
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
  
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 100px
      100: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      // when window width is >= 600px
      600: {
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