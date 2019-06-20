import blocksLibrary from '../blocksLibrary';
import config from '../config';
import { getMatrixHeight, getMatrixWidth } from './matrixHelper';

const overlapColor = config.overlapColor;

export function drawGame(context, board, currentBlock, blockSize) {
  clearCanvas(context);
  drawBoardSubstrate(context, blockSize);
  drawBoard(context, board, blockSize);
  drawBlock(context, currentBlock, blockSize);
}

export function clearCanvas(context) {
  const { width, height } = context.canvas;
  context.fillStyle = config.gridColor2;
  context.fillRect(0, 0, width, height);
}

function drawBoard(context, board, blockSize) {
  drawMatrix(context, board, blockSize);
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

function drawRect(context, row, col, val, blockSize) {
  let id;
  let overlapOpacity = -1;
  if (!Number.isInteger(val)) {
    id = Math.trunc(val);
    overlapOpacity = (val - id).toFixed(2) * 10;
  } else {
    id = val;
  }

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

  if (overlapOpacity !== -1) {
    drawOverlap(context, x, y, blockSize, overlapOpacity);
  }
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

function drawOverlap(context, x, y, blockSize, alpha) {
  context.globalAlpha = alpha;
  context.fillStyle = overlapColor;
  context.fillRect(x, y, blockSize, blockSize);
  context.globalAlpha = 1;
}

function drawBoardSubstrate(context, blockSize) {
  const [ boardWidth, boardHeight ] = config.boardSize;
  context.globalAlpha = config.boardSubstrateAlpha;

  // Draw vertical lines
  context.strokeStyle = config.boardSubstrateColor;
  context.lineWidth = 1;

  for (let i = 1; i < boardWidth; i++) {
    context.beginPath();
    context.moveTo(i * blockSize, 0);
    context.lineTo(i * blockSize, boardHeight * blockSize);
    context.stroke();
  }

  for (let i = 1; i < boardHeight; i++) {
    context.beginPath();
    context.moveTo(0, i * blockSize);
    context.lineTo(boardHeight * blockSize, i * blockSize);
    context.stroke();
  }

  context.globalAlpha = 1;
}

// TODO: use memorized selector
function getColorsByBlockId(id) {
  return blocksLibrary.find(block => block.id === id).colors;
}