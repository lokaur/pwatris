import { rotate, cloneMatrix } from './matrixHelper';
import blocksLibrary from '../blocksLibrary';
import config from '../config';

export function getRandomBlock() {
  const block = cloneBlock(blocksLibrary[random(blocksLibrary.length)]);
  const rotationCount = random(4);
  block.matrix = rotate(block.matrix, rotationCount);
  return block;
}

export function getCenterizedBlock(block) {
  const blockClone = cloneBlock(block);
  blockClone.x = Math.floor(
    (config.boardSize[0] - blockClone.matrix[0].length) / 2,
  );
  return blockClone;
}

export const cloneBlock = block => ({
  name: block.name,
  id: block.id,
  colors: { ...block.colors },
  x: block.x,
  y: block.y,
  matrix: cloneMatrix(block.matrix),
});

function random(max, low = 0) {
  return Math.floor(Math.random() * (max - low) + low);
}
