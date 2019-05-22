import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { resetBoard } from '../../stores/game';
import { drawGame } from '../../helpers/renderHelper'
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
          drawGame(context, currentBlock);
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
}

const mapDispatchToProps = { resetBoard };

const mapStateToProps = ({ game: { board, currentBlock } }) => ({ board, currentBlock });

export default connect(mapStateToProps, mapDispatchToProps)(GameCanvas);