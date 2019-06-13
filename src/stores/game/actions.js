import config from '../../config';

export const RESET_BOARD = 'BOARD@RESET_BOARD';
export const SET_GAME_STATE = 'GAME@SET_GAME_STATE';
export const MOVE_BLOCK_DOWN = 'GAME@MOVE_BLOCK_DOWN';
export const MOVE_BLOCK_LEFT = 'GAME@MOVE_BLOCK_LEFT';
export const MOVE_BLOCK_RIGHT = 'GAME@MOVE_BLOCK_RIGHT';
export const ROTATE_BLOCK = 'GAME@ROTATE_BLOCK';
export const MERGE_BLOCK_TO_BOARD = 'GAME@MERGE_BLOCK_TO_BOARD';
export const REMOVE_LINES = 'GAME@REMOVE_LINES';
export const ADD_SCORE = 'GAME@ADD_SCORE';
export const RESET_SCORE = 'GAME@RESET_SCORE';
export const TOGGLE_MUSIC = 'GAME@TOGGLE_MUSIC';
export const CHANGE_BLOCKS = 'GAME@CHANGE_BLOCKS';
export const RANDOMIZE_BLOCKS = 'GAME@RANDOMIZE_BLOCKS';

export const resetBoard = () => ({ type: RESET_BOARD });
export const setGameState = gameState => ({ type: SET_GAME_STATE, gameState });
export const moveBlockDown = () => ({ type: MOVE_BLOCK_DOWN });
export const moveBlockLeft = () => ({ type: MOVE_BLOCK_LEFT });
export const moveBlockRight = () => ({ type: MOVE_BLOCK_RIGHT });
export const rotateBlock = () => ({ type: ROTATE_BLOCK });
export const mergeBlockToBoard = (block) => ({ type: MERGE_BLOCK_TO_BOARD, block });
export const removeLines = (lineIndexes) => ({ type: REMOVE_LINES, lineIndexes });
export const addScore = (score) => ({ type: ADD_SCORE, score });
export const resetScore = () => ({ type: RESET_SCORE });
export const toggleMusic = () => ({ type: TOGGLE_MUSIC });
export const changeBlocks = () => ({ type: CHANGE_BLOCKS });
export const randomizeBlocks = () => ({ type: RANDOMIZE_BLOCKS });

export const getGameState = ({ game }) => game.gameState;
export const getCurrentBlock = ({ game }) => game.currentBlock;
export const getBoard = ({ game }) => game.board;
export const getFallRate = ({ game }) => config.baseFallRate + game.level * config.fallRateModifier;