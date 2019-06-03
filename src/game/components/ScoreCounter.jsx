import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './ScoreCounter.scss';

class ScoreCounter extends React.Component {
  static propTypes = {
    score: PropTypes.number.isRequired,
    highScore: PropTypes.number.isRequired
  };

  render() {
    const { score, highScore } = this.props;
    return (<div className='column score_counter'>
      <span className='column_title'>Score</span>
      <span className={`score-count ${score > 0 && score >= highScore ? 'rainbow' : ''}`}>{score}</span>
    </div>);
  }
}

const mapStateToProps = ({ game: { score, highScore } }) => ({ score, highScore });

export default connect(mapStateToProps)(ScoreCounter);