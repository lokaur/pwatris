import { createStore, combineReducers } from 'redux';

import game from './game/reducer';

export const reducers = combineReducers(
  { game }
);

export default createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);