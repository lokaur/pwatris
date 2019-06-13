import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toggleMusic } from '../../stores/game';

import './SoundControls.scss';

const SoundControls = (props) => (
  <div className='column sound-controls'>
    <button className='btn-square' onClick={ props.toggleMusic }>
      <FontAwesomeIcon icon={ `volume-${props.isMusicPlaying ? 'up' : 'mute'}` }/>
    </button>
  </div>);

SoundControls.propTypes = {
  isMusicPlaying: PropTypes.bool.isRequired,
  toggleMusic: PropTypes.func.isRequired
};

const mapStateToProps = ({ game: { isMusicPlaying } }) => ({ isMusicPlaying });

const mapDispatchToProps = {
  toggleMusic
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundControls);