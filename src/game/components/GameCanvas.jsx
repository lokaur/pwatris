import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import config from '../../config';
import { resetBoard } from '../../stores/game';
import './GameCanvas.scss';

class GameCanvas extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    resetBoard: PropTypes.func.isRequired
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
          this.draw(context);
          this.frameAnimationRequest = undefined;
        });
      }
    }
  }

  render() {
    const { width, height } = this.props;
    return (
      <canvas ref='gameCanvas' id='game' width={ width } height={ height }>
      </canvas>
    )
  }

  draw(context) {
    this.clearCanvas(context);
    this.drawBoard(context);
  }

  clearCanvas(context) {
    const { width, height } = context.canvas;
    context.fillStyle = config.gridColor2;
    context.fillRect(0, 0, width, height);
  }

  drawBoard(context) {
    const [ boardWidth, boardHeight ] = config.boardSize;
    const blockSize = config.blockSize;

    for (let i = 0; i < boardWidth; i++) {
      for (let j = 0; j < boardHeight; j++) {
        context.fillStyle = (i + j) % 2 === 0 ? config.gridColor1 : config.gridColor2;
        context.fillRect(i * blockSize, j * blockSize, blockSize, blockSize);
      }
    }
  }
}

const mapDispatchToProps = { resetBoard };

const mapStateToProps = ({ game: { board } }) => ({ board });

export default connect(mapStateToProps, mapDispatchToProps)(GameCanvas);