import React from 'react';
import { isMobile } from 'react-device-detect';

import GameCanvas from './game/components/GameCanvas'
import NextBlock from './game/components/NextBlock';
import ScoreCounter from './game/components/ScoreCounter';
import HighScoreCounter from './game/components/HighScoreCounter';
import LevelCounter from './game/components/LevelCounter';
import Music from './game/components/Music';

import './App.scss';

function App() {
  return (
    <div className='App'>
      <div className='main_container'>
        <div className='game_wrapper'>
          <GameCanvas/>
        </div>
        <div className='right_container'>
          <NextBlock/>
          <LevelCounter/>
          <ScoreCounter/>
          <HighScoreCounter/>
        </div>
      </div>
      { isMobile && <div style={ { color: '#fff' } }> Mobile!</div> }
      <Music/>
    </div>
  );
}

export default App;
