import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './HighScoreCounter.scss';

class HighScoreCounter extends React.Component {
  static propTypes = {
    highScore: PropTypes.number.isRequired
  };

  render() {
    const { highScore } = this.props;
    return (<div className='column high_score_counter'>
      <span className='column_title high_score_title'>High Score</span>
      <span className='high_score_count'>{highScore}</span>
    </div>);
  }
}

const mapStateToProps = ({ game: { highScore } }) => ({ highScore });

export default connect(mapStateToProps)(HighScoreCounter);