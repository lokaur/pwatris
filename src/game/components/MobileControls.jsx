import React from 'react';
import { faRedo, faChevronRight, faChevronLeft, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import Button from './Button';

import './MobileControls.scss';

class MobileControls extends React.Component {
  render() {
    return (
      <div className='mobile-controls'>
        <Button iconPrimary={ faChevronLeft } actionName='mleft'/>
        <Button iconPrimary={ faChevronRight } actionName='mright'/>
        <Button iconPrimary={ faRedo } actionName='mrotate'/>
        <Button iconPrimary={ faChevronDown } actionName='mdown'/>
      </div>);
  }
}

export default MobileControls;