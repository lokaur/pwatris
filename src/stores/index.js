import { createStore, combineReducers } from 'redux';

import { loadState, saveState } from '../helpers/localStorageHelper';

import game from './game/reducer';

export const reducers = combineReducers(
  { game }
);

const persistedState = loadState();
const store = createStore(
  reducers,
  persistedState
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;