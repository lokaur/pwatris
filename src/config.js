export default {
  boardSize: [ 10, 20 ], // classic tetris board size
  blockSize: 30,
  nextBlockSize: 25,
  nextBlockBoardSize: 4,
  gridColor1: '#5a338a',
  gridColor2: '#0e0032',
  baseFallRate: 1, // in seconds
  fallRateModifier: 0.5,
  outlineThickness: 0.14,
  boardSubstrateColor: '#FFF',
  boardSubstrateAlpha: 0.3,

  // input config
  downMovementSpeed: 40,
  holdKeyRepeatSpeed: 20,
  startRepeatSpeed: 2,
  beforeRepeatDelay: 0.25,
  controls: {
    rotate: ['arrowup', 'keyw', 'space', 'mrotate'],
    left: ['arrowleft', 'keya', 'mleft'],
    down: ['arrowdown', 'keys', 'mdown'],
    right: ['arrowright', 'keyd', 'mright'],
    start: ['enter', 'mstart'],
  }
};