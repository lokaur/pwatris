import React from 'react';
import config from './config'
import GameCanvas from './game/components/GameCanvas'
import './App.scss';

const [BOARD_WIDTH, BOARD_HEIGHT] = config.boardSize;
const CANVAS_WIDTH = BOARD_WIDTH * config.blockSize;
const CANVAS_HEIGHT = BOARD_HEIGHT * config.blockSize;

function App() {
  return (
    <div className="App">
      <GameCanvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT}/>
    </div>
  );
}

export default App;
