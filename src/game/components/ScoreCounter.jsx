import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './ScoreCounter.scss';

class ScoreCounter extends React.Component {
  static propTypes = {
    score: PropTypes.number.isRequired
  };

  render() {
    const { score } = this.props;
    return (<div className='column score_counter'>
      <span className='column_title'>Score</span>
      <span className={`score-count ${score > 5000 ? 'rainbow' : ''}`}>{score}</span>
    </div>);
  }
}

const mapStateToProps = ({ game: { score } }) => ({ score });

export default connect(mapStateToProps)(ScoreCounter);