export const RESET_BOARD = 'BOARD@RESET_BOARD';
export const SET_GAME_STATE = 'GAME@SET_GAME_STATE';
export const SET_NEXT_BLOCK = 'GAME@SET_NEXT_BLOCK';
export const SET_CURRENT_BLOCK = 'GAME@SET_CURRENT_BLOCK';
export const MOVE_BLOCK_DOWN = 'GAME@MOVE_BLOCK_DOWN';
export const MOVE_BLOCK_LEFT = 'GAME@MOVE_BLOCK_LEFT';
export const MOVE_BLOCK_RIGHT = 'GAME@MOVE_BLOCK_RIGHT';
export const ROTATE_BLOCK = 'GAME@ROTATE_BLOCK';

export const resetBoard = () => ({ type: RESET_BOARD });
export const setGameState = gameState => ({ type: SET_GAME_STATE, gameState });
export const setNextBlock = block => ({ type: SET_NEXT_BLOCK, block });
export const setCurrentBlock = block => ({ type: SET_CURRENT_BLOCK, block });
export const moveBlockDown = () => ({ type: MOVE_BLOCK_DOWN });
export const moveBlockLeft = () => ({ type: MOVE_BLOCK_LEFT });
export const moveBlockRight = () => ({ type: MOVE_BLOCK_RIGHT });
export const rotateBlock = () => ({ type: ROTATE_BLOCK });

export const getGameState = ({ game }) => game.gameState;
export const getNextBlock = ({ game }) => game.nextBlock;
