import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as gameStates from '../../stores/game/gameState';

import './GameState.scss';

const getGameStateText = state => {
  let text;
  switch (state) {
    case gameStates.GAME_STATE_INIT:
      text = 'Press Start';
      break;
    case gameStates.GAME_STATE_LOSE:
      text = 'Game Over';
      break;
    case gameStates.GAME_STATE_PAUSE:
      text = 'Pause';
      break;
    default:
      text = '';
      break;
  }

  return text;
};

const GameState = props =>
  props.gameState !== gameStates.GAME_STATE_PLAYING && (
    <div id='game_state'>
      <span>{getGameStateText(props.gameState)}</span>
    </div>
  );

GameState.propTypes = {
  gameState: PropTypes.string.isRequired,
};

const mapStateToProps = ({ game: { gameState } }) => ({ gameState });

export default connect(mapStateToProps)(GameState);
