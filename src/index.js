import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { cloneDeep } from 'lodash';

import store from './stores'
import * as game from './stores/game';

import * as gameStates from './stores/game/gameState';
import blocksLibrary from './blocksLibrary';

import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';
import config from './config';
import { getFullRowIndexes, hasCollision, rotate } from './helpers/matrixHelper';

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

let pressedKeys = {};

const onKeyDown = ({ code }) => {
  pressedKeys[ code.toLowerCase() ] = true;
};

const onKeyUp = ({ code }) => {
  delete pressedKeys[ code.toLowerCase() ];
};

const onBlur = () => {
  pressedKeys = {};
};

const isSomeKeyPressed = (...keys) => keys.reduce((defined, key) => defined || pressedKeys[ key ] !== undefined, false);

function main() {
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  window.addEventListener('blur', onBlur);

  initGame();

  ReactDOM.render(<Provider store={ store }><App/></Provider>, document.getElementById('root'));

  // TODO: make this app PWA
  serviceWorker.unregister();

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

  if (getGameState() !== gameStates.GAME_STATE_PLAYING) {
    return;
  }

  handleInGameInput(currentTime);
  updateBlockPosition(deltaTime);
  checkBoard();
}

function checkBoard() {
  const { matrix, x, y } = getCurrentBlock();
  if (hasCollision(getBoard(), matrix, x, y)) {
    placeCurrentBlockToBoard();
    collapseCompletedLines();
    setCurrentBlock(getCenterizedBlock(getNextBlock()));
    setNextBlock(getRandomBlock());
  }
}

function collapseCompletedLines() {
  const linesToRemove = getFullRowIndexes(getBoard());
  if (linesToRemove.length > 0) {
    removeLines(linesToRemove);
  }
}

function placeCurrentBlockToBoard() {
  const blockClone = cloneDeep(getCurrentBlock());
  blockClone.y -= 1;
  mergeBlockToBoard(blockClone);
}

function handleStartInput(currentTime) {
  if (isSomeKeyPressed(...config.controls.start)) {
    if (currentTime - lastStart > startKeyRepeatThreshold) {
      lastStart = currentTime;

      if (getGameState() === gameStates.GAME_STATE_PAUSE) {
        startGame();
      } else {
        pauseGame();
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
  if (isSomeKeyPressed(...config.controls.left)) {
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
  if (isSomeKeyPressed(...config.controls.right)) {
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
  if (isSomeKeyPressed(...config.controls.rotate)) {
    if (!isRotating) {
      isRotating = true;
      rotateBlock();
    }
  } else {
    isRotating = false;
  }
}

function handleInputDown(currentTime) {
  if (isSomeKeyPressed(...config.controls.down)) {
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
  if (lastPieceFallTime > Math.ceil(1000 / config.baseFallRate)) {
    lastPieceFallTime = 0;
    moveBlockDown();
  }
}

function getRandomBlock() {
  const block = blocksLibrary[ random(blocksLibrary.length) ];
  const rotationCount = random(4);
  block.matrix = rotate(block.matrix, rotationCount);
  return block;
}

function random(max, low = 0) {
  return Math.floor(Math.random() * (max - low) + low);
}

function initGame() {
  holdKeyMovementThreshold = Math.ceil(1000 / config.holdKeyRepeatSpeed);
  startKeyRepeatThreshold = Math.ceil(1000 / config.startRepeatSpeed);
  downKeyMovementThreshold = Math.ceil(1000 / config.downMovementSpeed);
  beforeRepeatDelay = Math.ceil(config.beforeRepeatDelay * 1000);

  setNextBlock(getRandomBlock());
  setCurrentBlock(getCenterizedBlock(getNextBlock()));
  setNextBlock(getRandomBlock());
}

function getCenterizedBlock(block) {
  const blockClone = cloneDeep(block);
  blockClone.x = Math.floor((config.boardSize[ 0 ] - blockClone.matrix[ 0 ].length) / 2);
  return blockClone;
}

// Setters
const setNextBlock = block => store.dispatch(game.setNextBlock(block));
const setCurrentBlock = block => store.dispatch(game.setCurrentBlock(block));

// Getters
const getterWrapper = getter => getter(store.getState());
const getGameState = () => getterWrapper(game.getGameState);
const getNextBlock = () => getterWrapper(game.getNextBlock);
const getCurrentBlock = () => getterWrapper(game.getCurrentBlock);
const getBoard = () => getterWrapper(game.getBoard);

// Methods
const moveBlockDown = () => store.dispatch(game.moveBlockDown());
const moveBlockLeft = () => store.dispatch(game.moveBlockLeft());
const moveBlockRight = () => store.dispatch(game.moveBlockRight());
const rotateBlock = () => store.dispatch(game.rotateBlock());
const startGame = () => store.dispatch(game.setGameState(gameStates.GAME_STATE_PLAYING));
const pauseGame = () => store.dispatch(game.setGameState(gameStates.GAME_STATE_PAUSE));
const mergeBlockToBoard = (block) => store.dispatch(game.mergeBlockToBoard(block));
const removeLines = (lineIndexes) => store.dispatch(game.removeLines(lineIndexes));

main();