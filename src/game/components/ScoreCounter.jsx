import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './ScoreCounter.scss';

const ScoreCounter = props => (
  <div className='column score_counter'>
    <span className='column_title'>Score</span>
    <span
      className={`counter${
        props.score > 0 && props.score >= props.highScore ? ' rainbow' : ''
      }`}
    >
      {props.score}
    </span>
  </div>
);

ScoreCounter.propTypes = {
  score: PropTypes.number.isRequired,
  highScore: PropTypes.number.isRequired,
};

const mapStateToProps = ({ game: { score, highScore } }) => ({
  score,
  highScore,
});

export default connect(mapStateToProps)(ScoreCounter);
