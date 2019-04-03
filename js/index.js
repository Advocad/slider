'use strict';
 class MultiSlider {
  constructor(selector) {
    this.selector = selector;
  }
  mainSettings(){
    const mainElement = document.querySelector(this.selector); // основный элемент блока
    const sliderWrapper = mainElement.querySelector('.slider__wrapper');
    const sliderItems = mainElement.querySelectorAll('.slider__item'); // элементы
    const sliderControls = mainElement.querySelectorAll('.slider__control'); // элементы управления
    const sliderControlLeft = mainElement.querySelector('.slider__control-left');// кнопка "LEFT"
    const sliderControlRight = mainElement.querySelector('.slider__control-right');// кнопка "RIGHT"
    const wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width);// ширина обёртки
    const itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width); // ширина одного элемента
    const positionLeftItem = 0;
    const transform = 0;
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
    
    
    
    
  }
  



  
}



let slider = new MultiSlider(".slider");

slider.mainSettings();
