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
    case types.RESET_BOARD:
      return { ...curState, board: createEmptyMatrix(...config.boardSize) };
    case types.SET_GAME_STATE:
      return { ...curState, gameState: action.gameState };
    case types.SET_NEXT_BLOCK:
      return { ...curState, nextBlock: action.block };
    case types.SET_CURRENT_BLOCK:
      return { ...curState, currentBlock: action.block };
    default:
      return curState;
  }
}