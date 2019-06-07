import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import keysWatcher from '../../keysWatcher';

import './Button.scss';

class Button extends React.Component {
  static propTypes = {
    iconPrimary: PropTypes.object.isRequired,
    iconSecondary: PropTypes.object,
    actionName: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isClicked: false
    };
  }

  onTouchStart(actionName) {
    const { isClicked } = this.state;
    keysWatcher.add(actionName);
    this.setState({ isClicked: !isClicked });
  }

  onTouchEnd(actionName) {
    keysWatcher.remove(actionName);
  }

  render() {
    const { iconPrimary, iconSecondary, actionName } = this.props;
    const { isClicked } = this.state;

    let showPrimary = true;

    if (iconSecondary && isClicked) {
      showPrimary = false;
    }

    return (
      <button className='btn-circle' onTouchStart={ () => this.onTouchStart(actionName) }
              onTouchEnd={ () => this.onTouchEnd(actionName) }>
        { showPrimary
          ? <FontAwesomeIcon className='btn-icon' icon={ iconPrimary }/>
          : <FontAwesomeIcon className='btn-icon' icon={ iconSecondary }/> }
      </button>);
  }
}

export default Button;