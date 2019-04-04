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
    let nexitem;
    let indexItem = 0;
    //  items.map(function (item,index) {
    //    return ({item: item, position: index, transform: 0});
    //  })
    sliderItems.forEach(function (item, index) {
      items.push({ item: item, position: index, transform: 0 });
    });
    console.log(items);
    
    let position ={
      itemMin: function () {
          items.forEach(function (item, index) {
            if (item.position < items[indexItem].position) {
              indexItem = index;
                
            }
        });
        return indexItem;
      },
      itemMax: function () {
        items.forEach(function (item, index) {
          if (item.position > items[indexItem].position) {
            indexItem = index;
              
          }
      });
      return indexItem;
      },
      getMin: function () {
        return items[position.itemMin()].position;
      },
      getMax: function () {
        return items[position.itemMax()].position;
      },
    }
    let transformItem = function (direction) {
      if(direction === 'right'){
        positionLeftItem++;
        if((positionLeftItem + wrapperWidth / itemWidth - 1) > position.getMax()){
          nexitem = position.itemMin();
          console.log(nexitem);
          items[nexitem].position = position.getMin() + 1;
          items[nexitem].transform += items.length * 100;
          console.log(items[nexitem].transform );
          items[nexitem].item.style.transform = 'translateX(' + items[nexitem].transform + '%)';
         
        }
        
        transform -= step;
      }
      if(direction === 'left'){
        positionLeftItem--;
        if( positionLeftItem < position.getMin()){
          nexitem = position.itemMax();
          console.log(nexitem);
          items[nexitem].position = position.getMin() + 1;
          items[nexitem].transform -= items.length * 100;
          console.log(items[nexitem].transform );
          items[nexitem].item.style.transform = 'translateX(' + items[nexitem].transform + '%)';
        }
        
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


