export const RESET_BOARD = 'BOARD@RESET_BOARD';
export const SET_GAME_STATE = 'GAME@SET_GAME_STATE';

export const resetBoard = () => ({ type: RESET_BOARD });
export const setGameState = gameState => ({ type: SET_GAME_STATE, gameState });

export const getGameState = state => state.gameState;