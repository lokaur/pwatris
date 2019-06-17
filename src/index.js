import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { cloneDeep } from 'lodash';

import store from './stores'
import * as game from './stores/game';

import * as GameStates from './stores/game/gameState';

import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';
import config from './config';
import keysWatcher from './keysWatcher';
import { getFullRowIndexes, hasCollision } from './helpers/matrixHelper';

let holdKeyMovementThreshold = 0;
let startKeyRepeatThreshold = 0;
let downKeyMovementThreshold = 0;
let beforeRepeatDelay = 0;

let lastFrameTime = 0;
let lastPieceFallTime = 0;
let lastDownMove = 0;
let lastLeftMove = 0;
let lastRightMove = 0;
let lastStart = 0;

let isRotating = false;
let isMovingRight = false;
let isMovingLeft = false;

const onKeyDown = ({ code }) => {
  keysWatcher.add(code);
};

const onKeyUp = ({ code }) => {
  keysWatcher.remove(code);
};

const onBlur = () => {
  keysWatcher.reset();
  if (getGameState() === GameStates.GAME_STATE_PLAYING) {
    pauseGame();
  }
};

function main() {
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  window.addEventListener('blur', onBlur);
  window.onbeforeunload = onBlur;

  holdKeyMovementThreshold = Math.ceil(1000 / config.holdKeyRepeatSpeed);
  startKeyRepeatThreshold = Math.ceil(1000 / config.startRepeatSpeed);
  downKeyMovementThreshold = Math.ceil(1000 / config.downMovementSpeed);
  beforeRepeatDelay = Math.ceil(config.beforeRepeatDelay * 1000);

  ReactDOM.render(<Provider store={ store }><App/></Provider>, document.getElementById('root'));

  serviceWorker.register();

  // Start main update loop
  window.requestAnimationFrame(onAnimationFrame);
}

function onAnimationFrame(currentTime) {
  update(currentTime);
  window.requestAnimationFrame(onAnimationFrame);
}

function update(currentTime) {
  const deltaTime = currentTime - lastFrameTime;
  lastFrameTime = currentTime;
  handleStartInput(currentTime);

  if (getGameState() !== GameStates.GAME_STATE_PLAYING) {
    return;
  }

  handleInGameInput(currentTime);
  updateBlockPosition(deltaTime);
  checkBoard();
}

function checkBoard() {
  if (checkCollision()) {
    placeCurrentBlockToBoard();
    collapseCompletedLines();
    changeBlocks();

    if (checkCollision()) {
      endGame();
    }
  }
}

const checkCollision = () => {
  const { matrix, x, y } = getCurrentBlock();
  return hasCollision(getBoard(), matrix, x, y);
};

function collapseCompletedLines() {
  const linesToRemove = getFullRowIndexes(getBoard());
  if (linesToRemove.length > 0) {
    removeLines(linesToRemove);
    addScore(Math.pow(linesToRemove.length, 2) * 100);
  }
}

function placeCurrentBlockToBoard() {
  const blockClone = cloneDeep(getCurrentBlock());
  blockClone.y -= 1;
  mergeBlockToBoard(blockClone);
}

function handleStartInput(currentTime) {
  if (keysWatcher.isPressed(...config.controls.start)) {
    if (currentTime - lastStart > startKeyRepeatThreshold) {
      lastStart = currentTime;

      switch (getGameState()) {
        case GameStates.GAME_STATE_INIT:
        case GameStates.GAME_STATE_PAUSE:
          startGame();
          break;
        case GameStates.GAME_STATE_PLAYING:
          pauseGame();
          break;
        case GameStates.GAME_STATE_LOSE:
          resetBoard();
          resetScore();
          randomizeBlocks();
          startGame();
          break;
        default:
          break;
      }
    }
  } else {
    lastStart = 0;
  }
}

function handleInGameInput(currentTime) {
  handleInputDown(currentTime);
  handleInputLeft(currentTime);
  handleInputRight(currentTime);
  handleInputRotate();
}

function handleInputLeft(currentTime) {
  if (keysWatcher.isPressed(...config.controls.left)) {
    const moveLeft = () => {
      moveBlockLeft();
      lastLeftMove = currentTime;
    };

    const deltaTime = currentTime - lastLeftMove;
    if (deltaTime > holdKeyMovementThreshold) {
      if (lastLeftMove === 0) { // No delay on first press
        moveLeft();
      } else if (isMovingLeft || deltaTime > beforeRepeatDelay) { // Delay after first move
        isMovingLeft = true;
        moveLeft();
      }
    }
  } else {
    isMovingLeft = false;
    lastLeftMove = 0;
  }
}

function handleInputRight(currentTime) {
  if (keysWatcher.isPressed(...config.controls.right)) {
    const moveRight = () => {
      moveBlockRight();
      lastRightMove = currentTime;
    };

    const deltaTime = currentTime - lastRightMove;
    if (deltaTime > holdKeyMovementThreshold) {
      if (lastRightMove === 0) { // No delay on first press
        moveRight();
      } else if (isMovingRight || deltaTime > beforeRepeatDelay) { // Delay after first move
        isMovingRight = true;
        moveRight();
      }
    }
  } else {
    isMovingRight = false;
    lastRightMove = 0;
  }
}

function handleInputRotate() {
  if (keysWatcher.isPressed(...config.controls.rotate)) {
    if (!isRotating) {
      isRotating = true;
      rotateBlock();
    }
  } else {
    isRotating = false;
  }
}

function handleInputDown(currentTime) {
  if (keysWatcher.isPressed(...config.controls.down)) {
    if (currentTime - lastDownMove > downKeyMovementThreshold) {
      lastDownMove = currentTime;
      lastPieceFallTime = 0;
      moveBlockDown();
    }
  } else {
    lastDownMove = 0;
  }
}

function updateBlockPosition(deltaTime) {
  lastPieceFallTime += deltaTime;
  if (lastPieceFallTime > Math.ceil(1000 / getFallRate())) {
    lastPieceFallTime = 0;
    moveBlockDown();
  }
}

// Getters
const getterWrapper = getter => getter(store.getState());
const getGameState = () => getterWrapper(game.getGameState);
const getCurrentBlock = () => getterWrapper(game.getCurrentBlock);
const getBoard = () => getterWrapper(game.getBoard);
const getFallRate = () => getterWrapper(game.getFallRate);

// Methods
const moveBlockDown = () => store.dispatch(game.moveBlockDown());
const moveBlockLeft = () => store.dispatch(game.moveBlockLeft());
const moveBlockRight = () => store.dispatch(game.moveBlockRight());
const rotateBlock = () => store.dispatch(game.rotateBlock());
const startGame = () => store.dispatch(game.setGameState(GameStates.GAME_STATE_PLAYING));
const pauseGame = () => store.dispatch(game.setGameState(GameStates.GAME_STATE_PAUSE));
const endGame = () => store.dispatch(game.setGameState(GameStates.GAME_STATE_LOSE));
const resetBoard = () => store.dispatch(game.resetBoard());
const mergeBlockToBoard = (block) => store.dispatch(game.mergeBlockToBoard(block));
const removeLines = (lineIndexes) => store.dispatch(game.removeLines(lineIndexes));
const addScore = (score) => store.dispatch(game.addScore(score));
const resetScore = () => store.dispatch(game.resetScore());
const changeBlocks = () => store.dispatch(game.changeBlocks());
const randomizeBlocks = () => store.dispatch(game.randomizeBlocks());

main();