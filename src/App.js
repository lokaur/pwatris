import React from 'react';
import { isMobile } from 'react-device-detect';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlay,
  faPause,
  faRedo,
  faChevronRight,
  faChevronLeft,
  faChevronDown,
  faVolumeUp,
  faVolumeMute
} from '@fortawesome/free-solid-svg-icons';

import GameCanvas from './game/components/GameCanvas'
import NextBlock from './game/components/NextBlock';
import ScoreCounter from './game/components/ScoreCounter';
import HighScoreCounter from './game/components/HighScoreCounter';
import LevelCounter from './game/components/LevelCounter';
import Music from './game/components/Music';
import MobileControls from './game/components/MobileControls';

import './App.scss';
import StartButton from './game/components/StartButton';
import ControlsHelp from './game/components/ControlsHelp';
import SoundControls from './game/components/SoundControls';

library.add(faPlay, faPause, faRedo, faChevronRight, faChevronLeft, faChevronDown, faVolumeUp, faVolumeMute);

const App = () => (
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
        <SoundControls/>
        { isMobile && (
          <div className='column'>
            <StartButton/>
          </div>) }
        { !isMobile && <ControlsHelp/> }
      </div>
    </div>
    { isMobile && <MobileControls/> }
    <Music/>
  </div>
);

export default App;
