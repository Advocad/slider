# Слайдер
## Слайдер состоит из 
css - стили для слайдера
js - сам скрипт слайдера 

## Как использовать
Подключить стили к своему проекту
Подключить index.js к проекту

Блоки обернуть по примеру
```
 <div class="slider">
    <div class="slider__wrapper">
      <div class="slider__item">
        <img src="" alt="">
      </div>
      <div class="slider__item">
        <img src="" alt="">
      </div>
      <div class="slider__item">
        <img src="" alt="">
      </div>
      <div class="slider__item">
        <img src="" alt="">
      </div>
    </div>
    <a class="slider__control slider__control-left" href="#"></a>
    <a class="slider__control slider__control-right" href="#"></a>
  </div>
```
И вызвать сам слайдер с параметрами 
```
  const slider = new MultiSlider(".slider", { // класс контейнера
    isCycle: true, // автоматическая смена слайдов
    positionSlide: right, // направление смены слайдов
    interval: 5000 // интервал между автоматической сменой слайдов
  });
  slider.init(); // инициализация
```
