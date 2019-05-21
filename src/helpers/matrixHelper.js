import { constant, times } from 'lodash';

const createEmptyArray = length => times(length, constant(0));
const getMatrixHeight = matrix => matrix.length;
const getMatrixWidth = matrix => matrix[0].length;

export function createEmptyMatrix(width, height) {
  let matrix = createEmptyArray(height);
  const createRow = () => createEmptyArray(width);
  return matrix.map(createRow);
}

export function mergeMatrices(source, destination) {

}