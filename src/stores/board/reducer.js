import {times, constant} from 'lodash';

import * as types from './actions';
import config from '../../config';

const initialState = {
  board: [[0]]
};

function createEmptyBoard(width, height) {
  const columns = times(width, constant(0));
  console.log(columns);
}

export default function (curState = initialState, action) {
  switch (action.type) {
    case types.RESET_BOARD:
      return {...curState, board: createEmptyBoard(...config.boardSize)};
    default:
      return curState;
  }
};