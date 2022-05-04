'use strict';

const carrotSound = new Audio('./sound/alert.wav');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');



export function playCarrotSound () {
  playSound(carrotSound);
}
export function playAlertSound () {
  playSound(alertSound);
}
export function playBugSound () {
  playSound(bugSound);
}
export function playWinSound () {
  playSound(winSound);
}
export function stopWinSound () {
  stopSound(winSound);
}
export function playBgSound () {
  playSound(bgSound);
}
export function stopBgSound () {
  stopSound(bgSound);
}




function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
};

function stopSound(sound) {
  sound.pause();
};
