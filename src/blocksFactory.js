let i = 0;

const createBlock = (name, color, matrix) => {
  const id = i++;
  return {
    name,
    id,
    color,
    matrix: matrix.map(r => r.map(v => v === 0 ? 0 : id)),
    x: 0,
    y: 0
  }
};

const blocks = [
  createBlock(
    'I',
    '#00f0f0',
    [
      [ 1 ],
      [ 1 ],
      [ 1 ],
    ]),
  createBlock(
    'J',
    '#0000f0',
    [
      [ 0, 1 ],
      [ 0, 1 ],
      [ 1, 1 ],
    ]),
  createBlock(
    'L',
    '#f0a000',
    [
      [ 1, 0 ],
      [ 1, 0 ],
      [ 1, 1 ],
    ]),
  createBlock(
    'O',
    '#f0f000',
    [
      [ 1, 1 ],
      [ 1, 1 ],
    ]),
  createBlock(
    'S',
    '#00f000',
    [
      [ 0, 1, 1 ],
      [ 1, 1, 0 ],
    ]),
  createBlock(
    'T',
    '#a000f0',
    [
      [ 0, 1, 0 ],
      [ 1, 1, 1 ],
    ]),
  createBlock(
    'Z',
    '#f00000',
    [
      [ 1, 1, 0 ],
      [ 0, 1, 1 ],
    ]),
];

export default blocks;