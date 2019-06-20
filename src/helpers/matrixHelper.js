import { constant, times, inRange, cloneDeep } from 'lodash';

const createEmptyArray = length => times(length, constant(0));
export const getMatrixHeight = matrix => matrix.length;
export const getMatrixWidth = matrix => matrix[ 0 ].length;

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

export function updateLinesOverlap(lines, percent) {
  // console.log(`Update ${lines.length}; Percent: ${percent}`);
  // console.log(lines);
}

// Rotates matrix clockwise
export function rotate(sourceMatrix, count = 1) {
  if (count === 0) {
    return sourceMatrix;
  }

  let rotatedMatrix = null;

  for (let i = 0; i < count; i++) {
    rotatedMatrix = rotateMatrixClockwise(sourceMatrix);
  }

  return rotatedMatrix;
}

export const getFullRowIndexes = (board) => board.reduce((acc, row, idx) => {
  if (row.every(el => el > 0)) {
    acc.push(idx);
  }

  return acc;
}, []);

export const removeRow = (board, idx) => {
  const boardClone = cloneDeep(board);
  const newRowMatrix = [createEmptyArray(getMatrixWidth(boardClone))];
  boardClone.splice(idx, 1);
  return newRowMatrix.concat(boardClone);
};

function rotateMatrixClockwise(sourceMatrix) {
  const height = getMatrixHeight(sourceMatrix);
  const width = getMatrixWidth(sourceMatrix);

  // noinspection JSSuspiciousNameCombination
  const flippedMatrix = createEmptyMatrix(height, width);

  times(height, (row) => {
    times(width, (column) => {
      flippedMatrix[ column ][ row ] = sourceMatrix[ row ][ column ]
    })
  });

  return flippedMatrix.map(row => row.reverse());
}