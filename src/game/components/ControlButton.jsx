import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import keysWatcher from '../../keysWatcher';

import './Button.scss';

const onTouchStart = (actionName) => keysWatcher.add(actionName);
const onTouchEnd = (actionName) => keysWatcher.remove(actionName);

const ControlButton = (props) => (
  <button className='btn-circle' onTouchStart={ () => onTouchStart(props.actionName) }
          onTouchEnd={ () => onTouchEnd(props.actionName) }>
    <FontAwesomeIcon className='btn-icon' icon={ props.icon }/>
  </button>);

ControlButton.propTypes = {
  icon: PropTypes.object.isRequired,
  actionName: PropTypes.string.isRequired
};

export default ControlButton;