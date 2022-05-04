'use strict';

import {Field, ItemType} from './field.js';
import * as sound from './sound.js';


export const Reason = Object.freeze({
  win : 'win',
  lose : 'lose',
  cancel: 'cancel'
})

export class GameBuilder {
  withCarrotCount (num) {
    this.carrotCount = num;
    return this;
  }
  withBugCount (num) {
    this.bugCount = num;
    return this;
  }
  withGameDuration (num) {
    this.gameDuration = num;
    return this;
  }
  build() {
    console.log(this);
    return new Game(
      this.carrotCount,
      this.bugCount,
      this.gameDuration
    );
  }
}


class Game {
  constructor(carrotCount, bugCount, gameDuration) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.gameDuration = gameDuration;

    this.timer = document.querySelector('.timer');
    this.counter = document.querySelector('.counter');
    this.playBtn = document.querySelector('.play_stop');
    this.playBtn.addEventListener('click', ()=> {
      this.started ? this.stop(Reason.cancel) : this.start();
    });

    this.gameField = new Field (carrotCount,bugCount);
    this.gameField.setClickListener(this.onItemClick);

    this.started = false;
    this.timerCountdown = undefined;
    this.score = 0;
  }
  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this.initGame();
    this.showStopBtn();
    this.showTimerNCounter();
    this.startTimer();
    sound.playBgSound();
  };
  
  stop(reason) {
    this.started = false;
    this.stopGameTimer();
    this.hidePlayBtn();
    sound.stopBgSound();
    this.onGameStop && this.onGameStop(reason);
  };


  onItemClick = (item) => {
    if(!this.started) {
      return;
    }
    if(item === ItemType.carrot) {
      this.score++;
      this.updateScore();
      if(this.score === this.carrotCount) {
        this.stop(Reason.win);
      }
    } else if (item === ItemType.bug) {
      this.stop(Reason.lose);
    }
  }

  showStopBtn() {
    const icon = document.querySelector('.fa-solid');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    this.playBtn.style.visibility = 'visible';
  };
  
  hidePlayBtn() {
    this.playBtn.style.visibility = 'hidden';
  };
  
  showTimerNCounter() {
    this.timer.style.visibility = 'visible';
    this.counter.style.visibility = 'visible';
  };
  
  startTimer() {
    let remainingTime = this.gameDuration;
    this.updateTimerText(remainingTime);
    this.timerCountdown = setInterval(()=>{
      if (remainingTime <= 0) {
        clearInterval(this.timerCountdown);
        this.stop(this.score === this.carrotCount ? Reason.win : Reason.lose);
        return;
      }else {
        this.updateTimerText(--remainingTime);
      }
    },1000);
  };
  
  stopGameTimer() {
    clearInterval(this.timerCountdown);
  };
  

  updateTimerText(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    this.timer.innerHTML = `${minutes}:${seconds}`;
  };
  
  
  initGame() {
    this.score = 0;
    this.counter.innerHTML = this.carrotCount;
    this.gameField.init();
  }
  
  
  updateScore() {
    this.counter.innerHTML = this.carrotCount - this.score;
  }
}