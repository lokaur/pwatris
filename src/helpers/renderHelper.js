import blocksLibrary from '../blocksLibrary';
import config from '../config';

export function drawGame(context, currentBlock) {
  clearCanvas(context);
  drawBoard(context);
  drawBlock(context, currentBlock);
}

function clearCanvas(context) {
  const { width, height } = context.canvas;
  context.fillStyle = config.gridColor2;
  context.fillRect(0, 0, width, height);
}

function drawBlock(context, currentBlock) {
  console.log(`Drawing block ${currentBlock.name}`);
  console.log(currentBlock);
  drawMatrix(context, currentBlock.matrix, currentBlock.x, currentBlock.y);
}

function drawMatrix(context, matrix, offsetX = 0, offsetY = 0) {
  matrix.map((col, colIdx) => {
    col.map((val, rowIdx) => {
      if (val !== 0) {
        drawRect(context, rowIdx + offsetX, colIdx + offsetY, val);
      }
    });
  });
}

function drawRect(context, row, col, id) {
  const colors = getColorsByBlockId(id);
  const blockSize = config.blockSize;
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

function drawBoard(context) {
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