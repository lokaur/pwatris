import { cloneDeep } from 'lodash';

import * as types from './actions';
import * as gameStates from './gameState';
import config from '../../config';
import { createEmptyMatrix } from '../../helpers/matrixHelper';

const initialState = {
  board: createEmptyMatrix(...config.boardSize),
  gameState: gameStates.GAME_STATE_PAUSE,
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
      const blockClone = cloneDeep(curState.currentBlock);
      blockClone.x -= 1;
      return { ...curState, currentBlock: blockClone };
    }
    case types.MOVE_BLOCK_RIGHT: {
      const blockClone = cloneDeep(curState.currentBlock);
      blockClone.x += 1;
      return { ...curState, currentBlock: blockClone };
    }
    case types.ROTATE_BLOCK: {
      const blockClone = cloneDeep(curState.currentBlock);
      console.log('rotate');
      return { ...curState, currentBlock: blockClone };
    }
    default: {
      return curState;
    }
  }
}