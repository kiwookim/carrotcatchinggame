'use strict';

import PopUp from './popUp.js';
import {GameBuilder,  Reason } from './game.js';
import * as sound from './sound.js';


const game = new GameBuilder()
  .withCarrotCount(15)
  .withBugCount(15)
  .withGameDuration(15)
  .build();

const gameFinishBanner = new PopUp ();

game.setGameStopListener(reason => {
  let message;
  switch (reason) {
    case Reason.cancel :
      message = 'Replay ?';
      sound.playAlertSound();
      break;
    case Reason.win :
      message = 'You WIN!!';
      sound.playWinSound();
      break;
    case Reason.lose :
      message = 'Try AGAIN!';
      sound.playBugSound();
      break;
    default :
      throw new Error ('invalid Reason');
  }
  gameFinishBanner.showWitTxt(message);
})

gameFinishBanner.setClickListener(()=> {
  game.start();
  sound.stopWinSound();
});

