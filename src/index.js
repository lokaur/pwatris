import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './stores'
import * as game from './stores/game';

import * as gameStates from './stores/game/gameState';

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
  console.log('move');
}

function initGame() {
  // TODO: initialize game
}

// Getters
const getGameState = () => game.getGameState(store.getState());

main();