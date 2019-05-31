import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './LevelCounter.scss';

class LevelCounter extends React.Component {
  static propTypes = {
    level: PropTypes.number.isRequired
  };

  render() {
    const { level } = this.props;
    return (<div className='column level_counter'>
      <span className='column_title'>Level</span>
      <span className='current_level'>{level + 1}</span>
    </div>);
  }
}

const mapStateToProps = ({ game: { level } }) => ({ level });

export default connect(mapStateToProps)(LevelCounter);