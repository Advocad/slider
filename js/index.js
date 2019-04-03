'use strict';
let multiSlider = ( function () {
  return function (selector) {
    const mainElement = document.querySelector(selector); // основный элемент блока   
    const sliderWrapper = mainElement.querySelector('.slider__wrapper');
    const sliderItems = mainElement.querySelectorAll('.slider__item'); // элементы
    const sliderControls = mainElement.querySelectorAll('.slider__control'); // элементы управления
    const sliderControlLeft = mainElement.querySelector('.slider__control-left');// кнопка "LEFT"
    const sliderControlRight = mainElement.querySelector('.slider__control-right');// кнопка "RIGHT"
    const wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width);// ширина обёртки
    const itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width); // ширина одного элемента
    let positionLeftItem = 0;
    let transform = 0;
    let step = itemWidth / wrapperWidth * 100;
    let items = [];
    
    //  items.map(function (item,index) {
    //    return ({item: item, position: index, transform: 0});
    //  })
    sliderItems.forEach(function (item, index) {
      items.push({ item: item, position: index, transform: 0 });
    });

    let position ={
      getMin: 0,
      getMax: items.length -1,
    }
    let transformItem = function (direction) {
      if(direction === 'right'){
        if((positionLeftItem + wrapperWidth / itemWidth - 1) >= position.getMax){
          return;
        }
        positionLeftItem++;
        transform -= step;
      }
      if(direction === 'left'){
        if( positionLeftItem <= position.getMin){
          return
        }
        positionLeftItem--;
        transform += step;
      }
      sliderWrapper.style.transform = 'translateX(' + transform + '%)';
    }
    // обработчик события click для кнопок "назад" и "вперед"
    let controlClick = function (e) {
      const direction = this.classList.contains('slider__control-right') ? 'right' : 'left';
      e.preventDefault();
      transformItem(direction);
    };

    let setUpListeners = function () {
      // добавление к кнопкам "назад" и "вперед" обрботчика controlClick для событя click
      sliderControls.forEach(function (item) {
        item.addEventListener('click', controlClick);
      });
    }

    // инициализация
    setUpListeners();

    return {
      right: function () { // метод right
        transformItem('right');
      },
      left: function () { // метод left
        transformItem('left');
      }
    }
  }
}());


let slider = multiSlider('.slider');


