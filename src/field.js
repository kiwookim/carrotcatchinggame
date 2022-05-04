'use strict';
import * as sound from './sound.js';


export const ItemType = Object.freeze({
  carrot : 'carrot',
  bug : 'bug'
})



const imgSize = 105;

export class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector('.playing_field');
    this.fieldRect = this.field.getBoundingClientRect();
    this.onClick = this.onClick.bind(this);
    this.field.addEventListener('click', this.onClick);
  }
  init() {
    this.field.innerHTML = '';
    this._addImage('carrot', this.carrotCount , './img/carrot.png');
    this._addImage('bug',this.bugCount,'./img/bug.png');
  }
  setClickListener (onItemClick) {
    this.onItemClick = onItemClick;
  }
  _addImage(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width-imgSize;
    const y2 = this.fieldRect.height-imgSize;

    for(let i = 0 ; i < count; i++) {
      let image = document.createElement('img');
      image.setAttribute('class', className);
      image.setAttribute('src', imgPath);
      image.style.position = 'absolute';
      const x = randomNumber(x1,x2);
      const y = randomNumber(y1,y2);
      image.style.left = `${x}px`;
      image.style.top = `${y}px`;
      this.field.appendChild(image);
    }  
  }
  onClick(event) {
    const target = event.target;
    if(target.matches('.carrot')) {
      target.remove();
      this.onItemClick && this.onItemClick(ItemType.carrot);
      sound.playCarrotSound();
    } else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  }
}


function randomNumber(min,max) {
  return Math.random() * (max - min) + min;
}
