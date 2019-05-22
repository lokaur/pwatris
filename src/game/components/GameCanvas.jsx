import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import config from '../../config';
import { resetBoard } from '../../stores/game';
import blocksLibrary from '../../blocksFactory';
import './GameCanvas.scss';

class GameCanvas extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    currentBlock: PropTypes.object.isRequired,
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
    const { currentBlock } = this.props;

    if (canvas) {
      const context = canvas.getContext('2d');
      if (!this.frameAnimationRequest) {
        this.frameAnimationRequest = window.requestAnimationFrame(() => {
          this.draw(context, currentBlock);
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

  draw(context, currentBlock) {
    this.clearCanvas(context);
    this.drawBoard(context);
    this.drawBlock(context, currentBlock);
  }

  clearCanvas(context) {
    const { width, height } = context.canvas;
    context.fillStyle = config.gridColor2;
    context.fillRect(0, 0, width, height);
  }

  drawBlock(context, currentBlock) {
    console.log(`Drawing block ${currentBlock.name}`);
    this.drawMatrix(context, currentBlock.matrix, currentBlock.x, currentBlock.y);
  }

  drawMatrix(context, matrix, offsetX = 0, offsetY = 0) {
    matrix.map((col, colIdx) => {
      col.map((val, rowIdx) => {
        if (val !== 0) {
          this.drawRect(context, rowIdx + offsetX, colIdx + offsetY, this.getColorByBlockId(val));
        }
      });
    });
  }

  drawRect(context, row, col, color) {
    context.fillStyle = color;
    context.fillRect(row * config.blockSize, col * config.blockSize, config.blockSize, config.blockSize);
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

  // TODO: use memorized selector
  getColorByBlockId(id) {
    return blocksLibrary.find(block => block.id === id).color;
  }
}

const mapDispatchToProps = { resetBoard };

const mapStateToProps = ({ game: { board, currentBlock } }) => ({ board, currentBlock });

export default connect(mapStateToProps, mapDispatchToProps)(GameCanvas);