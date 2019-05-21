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
    default:
      return curState;
  }
}