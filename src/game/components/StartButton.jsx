import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index.es';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import * as gameStates from '../../stores/game/gameState'
import keysWatcher from '../../keysWatcher';

import './Button.scss';

const startAction = 'mstart';
const onTouchStart = () => keysWatcher.add(startAction);
const onTouchEnd = () => keysWatcher.remove(startAction);

const StartButton = (props) => (
  <button className='btn-circle' onTouchStart={ onTouchStart } onTouchEnd={ onTouchEnd }>
    { props.gameState === gameStates.GAME_STATE_PLAYING
      ? <FontAwesomeIcon className='btn-icon' icon={ faPause }/>
      : <FontAwesomeIcon className='btn-icon' icon={ faPlay }/> }
  </button>);

StartButton.propTypes = {
  gameState: PropTypes.string.isRequired,
};

const mapStateToProps = ({ game: { gameState } }) => ({ gameState });

export default connect(mapStateToProps)(StartButton);