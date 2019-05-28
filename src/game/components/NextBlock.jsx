import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { clearCanvas, drawMatrix } from '../../helpers/renderHelper';
import { getMatrixWidth, getMatrixHeight } from '../../helpers/matrixHelper';
import config from '../../config';

import './NextBlock.scss';

class NextBlock extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    nextBlock: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    const { width, height } = props;

    this.canvasWidth = width * config.nextBlockSize;
    this.canvasHeight = height * config.nextBlockSize;
  }

  componentDidMount() {
    this.drawCanvas();
  }

  componentDidUpdate() {
    this.drawCanvas();
  }

  drawCanvas() {
    const { nextBlock, width, height } = this.props;
    const { nextBlockCanvas: canvas } = this.refs;

    if (canvas) {
      const context = canvas.getContext('2d');
      clearCanvas(context);
      const x = Math.floor((width - getMatrixWidth(nextBlock.matrix)) / 2);
      const y = Math.floor((height - getMatrixHeight(nextBlock.matrix)) / 2);
      drawMatrix(context, nextBlock.matrix, config.nextBlockSize, x, y);
    }
  }

  render() {
    return (
      <div className='column'>
        <span className='next_block_title'>Next</span>
        <div className='next_block_canvas_wrapper'>
          <canvas ref='nextBlockCanvas' className='next_block' width={ this.canvasWidth } height={ this.canvasHeight }/>
        </div>
      </div>);
  }
}

const mapStateToProps = ({ game: { nextBlock } }) => ({ nextBlock });

export default connect(mapStateToProps)(NextBlock);