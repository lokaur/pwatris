import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const LevelCounter = (props) =>
  (<div className='column level_counter'>
    <span className='column_title'>Level</span>
    <span className='counter'>{ props.level + 1 }</span>
  </div>);

LevelCounter.propTypes = {
  level: PropTypes.number.isRequired
};

const mapStateToProps = ({ game: { level } }) => ({ level });

export default connect(mapStateToProps)(LevelCounter);