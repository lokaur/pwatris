import React from 'react';
import GameCanvas from './game/components/GameCanvas'
import './App.scss';
import NextBlock from './game/components/NextBlock';
import ScoreCounter from './game/components/ScoreCounter';
import HighScoreCounter from './game/components/HighScoreCounter';
import LevelCounter from './game/components/LevelCounter';
import Music from './game/components/Music';

function App() {
  return (
    <div className='App'>
      <div className='game_wrapper'>
        <GameCanvas/>
      </div>
      <div className='right_container'>
        <NextBlock/>
        <LevelCounter/>
        <ScoreCounter/>
        <HighScoreCounter/>
      </div>
      <Music/>
    </div>
  );
}

export default App;
