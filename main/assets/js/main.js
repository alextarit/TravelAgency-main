 /*======================================== Vannila JS ========================================*/
 
 
 /*==================== Смена фона HEADER ====================*/
 function scrollHeader(){
    const header = document.getElementById('navbar')
    console.log
        // When the scroll is greater than 100 viewport height, add the scroll-header class to the header tag
        if(this.scrollY >= 100) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
    }
    window.addEventListener('scroll', scrollHeader)

    /*==================== Слайдер Swiper ====================*/

    // Инициализация Swiper после загрузки страницы
    document.addEventListener("DOMContentLoaded", function() {
        new Swiper(".swiper-container", {
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: "auto",
            loop: true,
            spaceBetween: 32,
            coverflowEffect: {
                rotate: 0,
            },
        });
    });

    /*==================== Видео ====================*/
    const videoFile = document.getElementById('video-file'),
        videoButton = document.getElementById('video-button'),
        videoIcon = document.getElementById('video-icon')

    function playPause(){ 
        if (videoFile.paused){
            // запускае видео
            videoFile.play()
            // меняем иконку
            videoIcon.classList.add('ri-pause-line')
            videoIcon.classList.remove('ri-play-line')
        }
        else {
            // на паузу видео
            videoFile.pause(); 
            // меняем иконку
            videoIcon.classList.remove('ri-pause-line')
            videoIcon.classList.add('ri-play-line')

        }
    }
    videoButton.addEventListener('click', playPause)

    function finalVideo(){
        // видео закончилось
        videoIcon.classList.remove('ri-pause-line')
        videoIcon.classList.add('ri-play-line')
    }
    // конец, когда видео закончилось
    videoFile.addEventListener('ended', finalVideo)



    
 /*======================================== jQuery JS ========================================*/


 /*==================== Плавная прокрутка по разделам навигации ====================*/

$(document).ready(function() {
  $("a.nav-link").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        window.location.hash = hash;
      });
    }
  });
});


/*==================== Добавление всплывающих подсказок для социальных сетей ====================*/

$(document).ready(function() {
    $(".home__social-link").hover(function() {
      var socialText = $(this).attr("data-social"); // для всех иконок добавляется текст с атрибутом data-social
      $(this).attr("title", socialText);
    }, function() {
      $(this).removeAttr("title");
    });
  });


  /*==================== Смена картинок при наведении ====================*/

$(document).ready(function() {
  // Когда наводим мышь на первое изображение
  $("#about .about__img-one").hover(function() {
    $(this).attr("src", "assets/img/about1-hover.jpg"); ю
  }, function() {
    $(this).attr("src", "assets/img/about1.jpg"); 
  });

  // Когда наводим мышь на второе изображение
  $("#about .about__img-two").hover(function() {
    $(this).attr("src", "assets/img/about2-hover.jpg"); 
  }, function() {
    $(this).attr("src", "assets/img/about2.jpg"); 
  });
});





/*======================================== Поиск по содержимому страницы ========================================*/

// Функция для выполнения поиска на странице
function searchOnPage(keyword) {
  // Очистка предыдущие результаты поиска и сброска стилизации
  clearSearchResults();

  // Получение текущего HTML-контент страницы
  var pageContent = document.body.innerHTML;

  // Создайте регулярное выражение для поиска
  var regex = new RegExp(keyword, 'gi'); // 'gi' - флаги для глобального и нечувствительного к регистру поиска

  // Найти совпадения
  var matches = pageContent.match(regex);

  if (matches) {
      var matchCounter = 1; // Счетчик совпадений
      // Если есть совпадения, выделить их стилями
      pageContent = pageContent.replace(regex, function (match) {
          var dataMatchValue = 'match' + matchCounter++; // Создаем значение для data-match
          return '<span class="highlighted" data-match="' + dataMatchValue + '">' + match + '</span>';
      });

      // Обновить HTML-контент страницы с выделенными совпадениями
      document.body.innerHTML = pageContent;

      // Вывести результаты поиска
      showSearchResults(matches);
  } else {
      // Если совпадений нет, вывести сообщение
      showNoResultsMessage();
  }
}

// Функция для вывода результатов поиска в виде ссылок
function showSearchResults(matches) {
  var resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = '<h2>Результаты поиска:</h2>';

  matches.forEach(function (match, index) {
      var link = document.createElement('a');
      link.href = 'javascript:void(0);'; // JavaScript:void(0) чтобы отменить стандартное действие ссылки
      link.textContent = match;
      link.addEventListener('click', function () {
          scrollToMatch('match' + (index + 1)); // Используем data-match значение
      });
      link.setAttribute('data-index', index); // Устанавливаем индекс элемента в атрибут данных
      resultsContainer.appendChild(link);
  });
}

// Функция для прокрутки к совпадению по тексту
function scrollToMatch(dataMatchValue) {
  var matchedElements = document.querySelectorAll('.highlighted[data-match="' + dataMatchValue + '"]');
  matchedElements.forEach(function (element) {
      element.scrollIntoView({ behavior: 'smooth' });
  });
}

// Функция для очистки результатов поиска и сброса стилизации
function clearSearchResults() {
  var highlightedElements = document.querySelectorAll('.highlighted');
  highlightedElements.forEach(function (element) {
      element.outerHTML = element.innerHTML;
  });
}

// Функция для вывода сообщения об отсутствии результатов поиска
function showNoResultsMessage() {
  alert('Ничего не найдено.');
}

// Обработчик отправки формы поиска
document.getElementById('searchForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Отменить стандартное поведение формы
  var searchTerm = document.getElementById('searchInput').value;
  searchOnPage(searchTerm);
});


