import React from 'react';
import { faRedo, faChevronRight, faChevronLeft, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import ControlButton from './ControlButton';

import './MobileControls.scss';

class MobileControls extends React.Component {
  render() {
    return (
      <div className='mobile-controls'>
        <ControlButton icon={ faChevronLeft } actionName='mleft'/>
        <ControlButton icon={ faChevronRight } actionName='mright'/>
        <ControlButton icon={ faRedo } actionName='mrotate'/>
        <ControlButton icon={ faChevronDown } actionName='mdown'/>
      </div>);
  }
}

export default MobileControls;