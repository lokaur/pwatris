import {createStore, combineReducers} from 'redux';

import board from './board/reducer'

export const reducers = combineReducers(
  {board}
);

export default createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);