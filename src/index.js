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

let lastFrameTime = 0;
let lastPieceFallTime = 0;

function main() {
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

  /*if (getGameState() !== gameStates.GAME_STATE_PLAYING) {
    return;
  }*/

  updatePiecePosition(deltaTime);
}

function updatePiecePosition(deltaTime) {
  lastPieceFallTime += deltaTime;
  if (lastPieceFallTime > Math.ceil(1000 / config.baseFallRate)) {
    lastPieceFallTime = 0;
    movePiece();
  }
}

function movePiece() {
}

function getRandomBlock() {
  return blocksLibrary[ random(blocksLibrary.length) ];
}

function random(max, low = 0) {
  return Math.floor(Math.random() * (max - low) + low);
}

function initGame() {
  setNextBlock(getRandomBlock());
  setCurrentBlock(getCenterizedBlock(getNextBlock()));
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

main();