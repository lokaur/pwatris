import React from 'react';

import ControlButton from './ControlButton';

import './MobileControls.scss';

const MobileControls = () => (
  <div className='mobile-controls'>
    <ControlButton icon='chevron-left' actionName='mleft'/>
    <ControlButton icon='chevron-right' actionName='mright'/>
    <ControlButton icon='redo' actionName='mrotate'/>
    <ControlButton icon='chevron-down' actionName='mdown'/>
  </div>);

export default MobileControls;