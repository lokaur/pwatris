import { rotate } from './matrixHelper';
import blocksLibrary from '../blocksLibrary';
import config from '../config';
import { cloneDeep } from 'lodash';

export function getRandomBlock() {
  const block = blocksLibrary[ random(blocksLibrary.length) ];
  const rotationCount = random(4);
  block.matrix = rotate(block.matrix, rotationCount);
  return block;
}

export function getCenterizedBlock(block) {
  const blockClone = cloneDeep(block);
  blockClone.x = Math.floor((config.boardSize[ 0 ] - blockClone.matrix[ 0 ].length) / 2);
  return blockClone;
}

function random(max, low = 0) {
  return Math.floor(Math.random() * (max - low) + low);
}