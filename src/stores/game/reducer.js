import { cloneDeep } from 'lodash';

import * as types from './actions';
import * as gameStates from './gameState';
import config from '../../config';
import {
  removeRow,
  getMatrixWidth,
  createEmptyMatrix,
  hasCollision,
  mergeMatrices,
  rotate
} from '../../helpers/matrixHelper';

const initialState = {
  board: createEmptyMatrix(...config.boardSize),
  gameState: gameStates.GAME_STATE_PAUSE,
  score: 0,
  highScore: 0,
  level: 0
};

export default function (curState = initialState, action) {
  switch (action.type) {
    case types.RESET_BOARD: {
      return { ...curState, board: createEmptyMatrix(...config.boardSize) };
    }
    case types.SET_GAME_STATE: {
      return { ...curState, gameState: action.gameState };
    }
    case types.SET_NEXT_BLOCK: {
      return { ...curState, nextBlock: action.block };
    }
    case types.SET_CURRENT_BLOCK: {
      return { ...curState, currentBlock: action.block };
    }
    case types.MOVE_BLOCK_DOWN: {
      const blockClone = cloneDeep(curState.currentBlock);
      blockClone.y += 1;
      return { ...curState, currentBlock: blockClone };
    }
    case types.MOVE_BLOCK_LEFT: {
      const currentBlock = curState.currentBlock;

      if (hasCollision(curState.board, currentBlock.matrix, currentBlock.x - 1, currentBlock.y)) {
        return curState;
      }

      const blockClone = cloneDeep(curState.currentBlock);
      blockClone.x -= 1;
      return { ...curState, currentBlock: blockClone };
    }
    case types.MOVE_BLOCK_RIGHT: {
      const currentBlock = curState.currentBlock;

      if (hasCollision(curState.board, currentBlock.matrix, currentBlock.x + 1, currentBlock.y)) {
        return curState;
      }

      const blockClone = cloneDeep(curState.currentBlock);
      blockClone.x += 1;
      return { ...curState, currentBlock: blockClone };
    }
    case types.ROTATE_BLOCK: {
      const blockClone = cloneDeep(curState.currentBlock);
      blockClone.matrix = rotate(blockClone.matrix);
      if (!validateRotation(blockClone, curState.board)) {
        return curState;
      }

      return { ...curState, currentBlock: blockClone };
    }
    case types.MERGE_BLOCK_TO_BOARD: {
      const { matrix, x, y } = action.block;
      return { ...curState, board: mergeMatrices(curState.board, matrix, x, y) }
    }
    case types.REMOVE_LINES: {
      return {
        ...curState,
        board: action.lineIndexes.reduce((board, lineIndex) => removeRow(board, lineIndex), cloneDeep(curState.board))
      };
    }
    case types.ADD_SCORE: {
      const newScore = curState.score + action.score;
      const newHighScore = curState.highScore + action.score > curState.highScore ? newScore : curState.highScore;
      const level = Math.floor(newScore / 1000);
      return { ...curState, score: newScore, highScore: newHighScore, level };
    }
    case types.RESET_SCORE: {
      return { ...curState, score: 0 };
    }
    default: {
      return curState;
    }
  }
}

function validateRotation(rotatedBlock, board) {
  const blockWidth = getMatrixWidth(rotatedBlock.matrix);
  let offsetX = 1;

  while (hasCollision(board, rotatedBlock.matrix, rotatedBlock.x, rotatedBlock.y)) {
    rotatedBlock.x += offsetX;
    offsetX = offsetX > 0 ? -offsetX : -offsetX + 1;

    if (Math.abs(offsetX) > Math.ceil(blockWidth / 2)) {
      return false;
    }
  }

  return true;
}