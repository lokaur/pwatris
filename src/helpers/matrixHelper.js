import { constant, times, inRange } from 'lodash';

const createEmptyArray = length => times(length, constant(0));
const getMatrixHeight = matrix => matrix.length;
const getMatrixWidth = matrix => matrix[ 0 ].length;

export function createEmptyMatrix(width, height) {
  let matrix = createEmptyArray(height);
  const createRow = () => createEmptyArray(width);
  return matrix.map(createRow);
}

export function hasCollision(board, block, offsetX = 0, offsetY = 0) {
  const blockHeight = getMatrixHeight(block);
  const blockWidth = getMatrixWidth(block);
  const boardHeight = getMatrixHeight(board);
  const boardWidth = getMatrixHeight(board);

  for (let blockRow = 0; blockRow < blockHeight; blockRow++) {
    for (let blockCol = 0; blockCol < blockWidth; blockCol++) {
      if (block[ blockRow ][ blockCol ] !== 0) {
        const boardCol = blockCol + offsetX;
        const boardRow = blockRow + offsetY;

        if (inRange(boardCol, 0, boardWidth) && inRange(boardRow, 0, boardHeight)) {
          if (board[ boardRow ][ boardCol ] !== 0) {
            return true;
          }
        } else {
          // out of board
          return true;
        }
      }
    }
  }

  return false;
}

export function mergeMatrices(board, block, offsetX, offsetY) {
  const lastColIndex = getMatrixWidth(block) + offsetX - 1;
  const lastRowIndex = getMatrixHeight(block) + offsetY - 1;

  return board.map((rows, y) => rows.map((val, x) => {
    if (inRange(x, offsetX, lastColIndex + 1) && inRange(y, offsetY, lastRowIndex + 1)) {
      if (!val) {
        return block[ y - offsetY ][ x - offsetX ];
      }
    }

    return val;
  }));
}