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
  rotate,
  updateLinesOverlap
} from '../../helpers/matrixHelper';
import { getCenterizedBlock, getRandomBlock } from '../../helpers/blocksHelper';

const initialState = {
  board: createEmptyMatrix(...config.boardSize),
  nextBlock: getRandomBlock(),
  currentBlock: getCenterizedBlock(getRandomBlock()),
  gameState: gameStates.GAME_STATE_INIT,
  score: 0,
  highScore: 0,
  level: 0,
  lines: 0,
  isMusicPlaying: false
};

export default function (curState = initialState, action) {
  switch (action.type) {
    case types.RESET_BOARD: {
      return { ...curState, board: createEmptyMatrix(...config.boardSize) };
    }
    case types.UPDATE_LINES_OVERLAP: {
      updateLinesOverlap(action.lines, action.percent);
      return curState;
    }
    case types.SET_GAME_STATE: {
      return { ...curState, gameState: action.gameState };
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
      const lines = action.lineIndexes.length + curState.lines;
      const level = Math.floor(lines / 10);
      return {
        ...curState,
        board: action.lineIndexes.reduce((board, lineIndex) => removeRow(board, lineIndex), cloneDeep(curState.board)),
        lines,
        level
      };
    }
    case types.ADD_SCORE: {
      return {
        ...curState,
        score: curState.score + action.score,
        highScore: curState.score + action.score > curState.highScore ? curState.score + action.score : curState.highScore
      };
    }
    case types.RESET_SCORE: {
      return { ...curState, score: 0, level: 0, lines: 0 };
    }
    case types.TOGGLE_MUSIC: {
      return { ...curState, isMusicPlaying: !curState.isMusicPlaying };
    }
    case types.CHANGE_BLOCKS: {
      return { ...curState, currentBlock: getCenterizedBlock(curState.nextBlock), nextBlock: getRandomBlock() };
    }
    case types.RANDOMIZE_BLOCKS: {
      return { ...curState, currentBlock: getCenterizedBlock(getRandomBlock()), nextBlock: getRandomBlock() };
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