import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Canvas from 'react-responsive-canvas';

import GameState from './GameState';
import { drawGame } from '../../helpers/renderHelper';
import config from '../../config';
import './GameCanvas.scss';

class GameCanvas extends React.Component {
  static propTypes = {
    board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    currentBlock: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onResize = this.onResize.bind(this);

    const [ boardWidth, boardHeight ] = config.boardSize;
    this.canvasPaddingBottom = 100 / boardWidth * boardHeight;
  }

  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  tryInitialize() {
    if (!this.isInitialized) {
      this.blockSize = this.calculateBlockSize();
      this.isInitialized = true;
    }
  }

  calculateBlockSize() {
    const [ boardWidth ] = config.boardSize;
    return this.canvas.width / boardWidth;
  }

  onResize() {
    this.blockSize = this.calculateBlockSize();
    this.draw();
  }

  draw() {
    if (!this.frameAnimationRequest) {
      this.frameAnimationRequest = window.requestAnimationFrame(() => {
        const { board, currentBlock } = this.props;
        this.tryInitialize();
        drawGame(this.ctx, board, currentBlock, this.blockSize);
        this.frameAnimationRequest = undefined;
      });
    }
  }

  render() {
    return (
      <div style={ { paddingBottom: `${this.canvasPaddingBottom}%` } }>
        <Canvas canvasRef={ el => (this.canvas = el) } onResize={ this.onResize } id='game'/>
        <GameState/>
      </div>);
  }
}

const mapStateToProps = ({ game: { board, currentBlock } }) => ({ board, currentBlock });

export default connect(mapStateToProps)(GameCanvas);