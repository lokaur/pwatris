import blocksLibrary from '../blocksLibrary';
import config from '../config';
import { getMatrixHeight, getMatrixWidth } from './matrixHelper';

export function drawGame(context, board, currentBlock) {
  clearCanvas(context);
  drawBoardSubstrate(context);
  drawBoard(context, board);
  drawBlock(context, currentBlock, config.blockSize);
}

export function clearCanvas(context) {
  const { width, height } = context.canvas;
  context.fillStyle = config.gridColor2;
  context.fillRect(0, 0, width, height);
}

function drawBoard(context, board) {
  drawMatrix(context, board, config.blockSize);
}

function drawBlock(context, currentBlock, blockSize) {
  drawMatrix(context, currentBlock.matrix, blockSize, currentBlock.x, currentBlock.y);
}

export function drawMatrix(context, matrix, blockSize, offsetX = 0, offsetY = 0) {
  let matrixHeight = getMatrixHeight(matrix);
  let matrixWidth = getMatrixWidth(matrix);

  for (let i = 0; i < matrixHeight; i++) {
    for (let j = 0; j < matrixWidth; j++) {
      const val = matrix[ i ][ j ];
      if (val !== 0) {
        drawRect(context, j + offsetX, i + offsetY, val, blockSize);
      }
    }
  }
}

function drawRect(context, row, col, id, blockSize) {
  const colors = getColorsByBlockId(id);
  const x = row * blockSize;
  const y = col * blockSize;
  const outlineWidth = blockSize * config.outlineThickness;
  const doubleOutlineWidth = outlineWidth * 2;

  drawOutlineTop(context, colors.top, x, y, blockSize, outlineWidth);
  drawOutlineRight(context, colors.right, x, y, blockSize, outlineWidth);
  drawOutlineBottom(context, colors.bottom, x, y, blockSize, outlineWidth);
  drawOutlineLeft(context, colors.left, x, y, blockSize, outlineWidth);

  // Drawing center rectangle
  context.fillStyle = colors.center;
  context.fillRect(x + outlineWidth, y + outlineWidth, blockSize - doubleOutlineWidth, blockSize - doubleOutlineWidth);
}

function drawOutlineTop(context, color, x, y, blockSize, outlineWidth) {
  context.fillStyle = color;
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x + blockSize, y);
  context.lineTo(x + blockSize - outlineWidth, y + outlineWidth);
  context.lineTo(x + outlineWidth, y + outlineWidth);
  context.lineTo(x, y);
  context.fill();
}

function drawOutlineRight(context, color, x, y, blockSize, outlineWidth) {
  context.fillStyle = color;
  context.beginPath();
  context.moveTo(x + blockSize, y);
  context.lineTo(x + blockSize, y + blockSize);
  context.lineTo(x + blockSize - outlineWidth, y + blockSize - outlineWidth);
  context.lineTo(x + blockSize - outlineWidth, y + outlineWidth);
  context.lineTo(x + blockSize, y);
  context.fill();
}

function drawOutlineBottom(context, color, x, y, blockSize, outlineWidth) {
  context.fillStyle = color;
  context.beginPath();
  context.moveTo(x, y + blockSize);
  context.lineTo(x + outlineWidth, y + blockSize - outlineWidth);
  context.lineTo(x + blockSize - outlineWidth, y + blockSize - outlineWidth);
  context.lineTo(x + blockSize, y + blockSize);
  context.lineTo(x, y + blockSize);
  context.fill();
}

function drawOutlineLeft(context, color, x, y, blockSize, outlineWidth) {
  context.fillStyle = color;
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x, y + blockSize);
  context.lineTo(x + outlineWidth, y + blockSize - outlineWidth);
  context.lineTo(x + outlineWidth, y + outlineWidth);
  context.lineTo(x, y);
  context.fill();
}

function drawBoardSubstrate(context) {
  const [ boardWidth, boardHeight ] = config.boardSize;
  const blockSize = config.blockSize;

  for (let i = 0; i < boardWidth; i++) {
    for (let j = 0; j < boardHeight; j++) {
      context.fillStyle = (i + j) % 2 === 0 ? config.gridColor1 : config.gridColor2;
      context.fillRect(i * blockSize, j * blockSize, blockSize, blockSize);
    }
  }
}

// TODO: use memorized selector
function getColorsByBlockId(id) {
  return blocksLibrary.find(block => block.id === id).colors;
}