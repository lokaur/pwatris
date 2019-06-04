import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Canvas from 'react-responsive-canvas';

import { clearCanvas, drawMatrix } from '../../helpers/renderHelper';
import { getMatrixWidth, getMatrixHeight } from '../../helpers/matrixHelper';
import config from '../../config';

import './NextBlock.scss';

class NextBlock extends React.Component {
  static propTypes = {
    nextBlock: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.nextBlockBoardSize = config.nextBlockBoardSize;
    this.onResize = this.onResize.bind(this);
  }

  componentDidMount() {
    this.ctx = this.nextBlockCanvas.getContext('2d');
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

  onResize() {
    this.blockSize = this.calculateBlockSize();
    this.draw();
  }

  calculateBlockSize() {
    return this.nextBlockCanvas.width / this.nextBlockBoardSize;
  }

  draw() {
    if (!this.frameAnimationRequest) {
      this.frameAnimationRequest = window.requestAnimationFrame(() => {
        const { nextBlock } = this.props;
        this.tryInitialize();
        clearCanvas(this.ctx);
        const x = Math.floor((this.nextBlockBoardSize - getMatrixWidth(nextBlock.matrix)) / 2);
        const y = Math.floor((this.nextBlockBoardSize - getMatrixHeight(nextBlock.matrix)) / 2);
        drawMatrix(this.ctx, nextBlock.matrix, this.blockSize, x, y);
        this.frameAnimationRequest = undefined;
      });
    }
  }

  render() {
    return (
      <div className='column'>
        <span className='column_title'>Next</span>
        <div className='container'>
          <div className='next_block_canvas_wrapper'>
            <Canvas
              canvasRef={el => (this.nextBlockCanvas = el)}
              onResize={this.onResize}
              className='next_block'
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ game: { nextBlock } }) => ({ nextBlock });

export default connect(mapStateToProps)(NextBlock);