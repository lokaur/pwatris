import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const HighScoreCounter = (props) => (
  <div className='column high_score_counter'>
    <span className='column_title high_score_title'>High Score</span>
    <span className='counter'>{ props.highScore }</span>
  </div>);

HighScoreCounter.propTypes = {
  highScore: PropTypes.number.isRequired
};

const mapStateToProps = ({ game: { highScore } }) => ({ highScore });

export default connect(mapStateToProps)(HighScoreCounter);