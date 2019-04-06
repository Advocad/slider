const right = 'right';
const left = 'left';
const interval = 0;

class MultiSlider {
  constructor(selector, isCycle) {
    this.mainElement = document.querySelector(selector);  // основный элемент блока 
    this.sliderWrapper = this.mainElement.querySelector('.slider__wrapper');
    this.sliderItems = this.mainElement.querySelectorAll('.slider__item'); // элементы
    this.sliderControls = this.mainElement.querySelectorAll('.slider__control'); // элементы управления
    this.sliderControlLeft = this.mainElement.querySelector('.slider__control-left');// кнопка "LEFT"
    this.sliderControlRight = this.mainElement.querySelector('.slider__control-right');// кнопка "RIGHT"
    this.wrapperWidth = parseFloat(getComputedStyle(this.sliderWrapper).width);
    this.itemWidth = parseFloat(getComputedStyle(this.sliderItems[0]).width); 
  

    this.positionLeftItem = 0;
    this.transform = 0;
    this.step = this.itemWidth / this.wrapperWidth * 100;
    this.items = [];
    this.indexItem = 0;
    this.isCycle =  isCycle == true ? true : false;
  };

  
 
  init(){
    console.log(this.items);
    this.sliderItems.forEach((item, index) => {
      this.items.push({ item, position: index, transform: 0 });
    });
    
    this.setUpListeners();

    this.cycle(right);
  };


  get itemMin() {
    this.items.forEach((item, index) => {
      if (item.position < this.items[this.indexItem].position) {
        this.indexItem = index;
          
      }
  });
  return this.indexItem;
  };
  get itemMax() {
    this.items.forEach((item, index) => {
      if (item.position > this.items[this.indexItem].position) {
        this.indexItem = index;
          
      }
    });
    return this.indexItem;
  };
  get getMin() {
    return this.items[this.itemMin].position;
  };
  get getMax() {
    
    return this.items[this.itemMax].position;
  };
  transformItem = (direction) =>{
    if(direction === right){
      this.positionLeftItem++;
      if((this.positionLeftItem + this.wrapperWidth / this.itemWidth - 1) > this.getMax){
        const nexitem = this.itemMin;
        this.items[nexitem].position = this.getMax + 1;
        this.items[nexitem].transform += this.items.length * 100;
        this.items[nexitem].item.style.transform = `translateX( ${this.items[nexitem].transform}%)`;
       
      }
      
      this.transform -= this.step;
    }
    if(direction === left){
      this.positionLeftItem--;
      if( this.positionLeftItem < this.getMin ){
        const nexitem = this.itemMax;
        this.items[nexitem].position = this.getMin - 1;
        this.items[nexitem].transform -= this.items.length * 100;
        this.items[nexitem].item.style.transform = `translateX( ${this.items[nexitem].transform}%)`;
      }
      
      this.transform += this.step;
    }
    this.sliderWrapper.style.transform = `translateX(${this.transform}%)`;
  };

  cycle = (direction) =>{
    if(!this.isCycle) return;
    interval = setInterval(() => {
      this.transformItem(direction);
    }, 2000);
  };
  controlClick = (event) => {
    const direction = event.target.classList.contains('slider__control-right') ? right : left;
    event.preventDefault();
    this.transformItem(direction);
    clearInterval(interval);
    this.cycle(right);
  };

  setUpListeners = () =>{
    this.sliderControls.forEach(item => {
      item.addEventListener('click', this.controlClick);
    });
  };
}


