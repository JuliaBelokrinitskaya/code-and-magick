import startGame from './game.js';

const FIREBALL_SIZE = 22;
const WIZARD_WIDTH = 70;
const WIZARD_SPEED = 3;

const getFireballSpeed = function (isDownwind) {
  return isDownwind ? 2 : 5;
};

const getWizardHeight = function () {
  return 1.337 * WIZARD_WIDTH;
};

const getWizardX = function (gameFieldWidth) {
  return (gameFieldWidth - WIZARD_WIDTH) / 2;
};

const getWizardY = function (gameFieldHeight) {
  return gameFieldHeight / 3;
};

startGame(
  FIREBALL_SIZE,
  getFireballSpeed,
  WIZARD_WIDTH,
  WIZARD_SPEED,
  getWizardHeight,
  getWizardX,
  getWizardY,
);
