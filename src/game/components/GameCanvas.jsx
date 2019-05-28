import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { drawGame } from '../../helpers/renderHelper'
import './GameCanvas.scss';

class GameCanvas extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    currentBlock: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.drawCanvas();
  }

  componentDidUpdate() {
    this.drawCanvas();
  }

  drawCanvas() {
    const { gameCanvas: canvas } = this.refs;

    if (canvas) {
      const context = canvas.getContext('2d');
      if (!this.frameAnimationRequest) {
        this.frameAnimationRequest = window.requestAnimationFrame(() => {
          const { board, currentBlock } = this.props;
          drawGame(context, board, currentBlock);
          this.frameAnimationRequest = undefined;
        });
      }
    }
  }

  render() {
    const { width, height } = this.props;
    return (
      <canvas ref='gameCanvas' id='game' width={ width } height={ height }/>
    )
  }
}

const mapStateToProps = ({ game: { board, currentBlock } }) => ({ board, currentBlock });

export default connect(mapStateToProps)(GameCanvas);