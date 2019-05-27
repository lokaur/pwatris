export default {
  boardSize: [ 10, 20 ], // classic tetris board size
  blockSize: 30,
  gridColor1: '#5a338a',
  gridColor2: '#0e0032',
  baseFallRate: 1, // in seconds
  outlineThickness: 0.14,

  // input config
  downMovementSpeed: 40,
  holdKeyRepeatSpeed: 8,
  startRepeatSpeed: 2,
  controls: {
    rotate: ['arrowup', 'keyw', 'space'],
    left: ['arrowleft', 'keya'],
    down: ['arrowdown', 'keys'],
    right: ['arrowright', 'keyd'],
    start: ['enter'],
  }
}