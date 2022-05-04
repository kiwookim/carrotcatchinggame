'use strict';

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector('.popUp');
    this.popUpTxt = document.querySelector('.status');
    this.popUpRefresh = document.querySelector('.reset');
    this.popUpRefresh.addEventListener('click', ()=> {
      this.onClick && this.onClick();
      this.hide();
    });
  }
  setClickListener (onClick) {
    this.onClick = onClick;
  }
  hide() {
    this.popUp.classList.add('popUp_hidden');
  }
  showWitTxt(text) {
    this.popUp.classList.remove('popUp_hidden');
    this.popUpTxt.innerHTML = text;
  }
};

