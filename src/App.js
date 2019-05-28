import React from 'react';
import config from './config'
import GameCanvas from './game/components/GameCanvas'
import './App.scss';
import NextBlock from './game/components/NextBlock';

const [ BOARD_WIDTH, BOARD_HEIGHT ] = config.boardSize;
const CANVAS_WIDTH = BOARD_WIDTH * config.blockSize;
const CANVAS_HEIGHT = BOARD_HEIGHT * config.blockSize;
const NEXT_BLOCK_WIDTH = 4;
const NEXT_BLOCK_HEIGHT = 4;

function App() {
  return (
    <div className="App">
      <div className='left_container'></div>
      <GameCanvas width={ CANVAS_WIDTH } height={ CANVAS_HEIGHT }/>
      <div className='right_container'>
        <NextBlock width={ NEXT_BLOCK_WIDTH } height={ NEXT_BLOCK_HEIGHT }/>
      </div>
    </div>
  );
}

export default App;
