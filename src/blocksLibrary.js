let i = 0;

const createBlock = (name, colors, matrix) => {
  const id = ++i;
  return {
    name,
    id,
    colors,
    matrix: matrix.map(r => r.map(v => v === 0 ? 0 : id)),
    x: 0,
    y: 0
  };
};

const blocks = [
  createBlock(
    'I',
    {
      center: '#00f0f0',
      top: '#60f6f6',
      bottom: '#007b7b',
      left: '#31f3f3',
      right: '#00a7a7',
    },
    [
      [ 0, 1, 0 ],
      [ 0, 1, 0 ],
      [ 0, 1, 0 ],
      [ 0, 1, 0 ],
    ]),
  createBlock(
    'J',
    {
      center: '#0000f0',
      top: '#6060f6',
      bottom: '#00007b',
      left: '#3131f3',
      right: '#0000a7',
    },
    [
      [ 0, 1 ],
      [ 0, 1 ],
      [ 1, 1 ],
    ]),
  createBlock(
    'L',
    {
      center: '#f0a000',
      top: '#f6c460',
      bottom: '#7b5200',
      left: '#f3b231',
      right: '#a76f00',
    },
    [
      [ 1, 0 ],
      [ 1, 0 ],
      [ 1, 1 ],
    ]),
  createBlock(
    'O',
    {
      center: '#f0f000',
      top: '#f6f660',
      bottom: '#7b7b00',
      left: '#f3f331',
      right: '#a7a700',
    },
    [
      [ 1, 1 ],
      [ 1, 1 ],
    ]),
  createBlock(
    'S',
    {
      center: '#00f000',
      top: '#60f660',
      bottom: '#007b00',
      left: '#31f331',
      right: '#00a700',
    },
    [
      [ 0, 1, 1 ],
      [ 1, 1, 0 ],
    ]),
  createBlock(
    'T',
    {
      center: '#a000f0',
      top: '#c460f6',
      bottom: '#52007b',
      left: '#b231f3',
      right: '#6f00a7',
    },
    [
      [ 0, 1, 0 ],
      [ 1, 1, 1 ],
    ]),
  createBlock(
    'Z',
    {
      center: '#f00000',
      top: '#f66060',
      bottom: '#7b0000',
      left: '#f33131',
      right: '#a70000',
    },
    [
      [ 1, 1, 0 ],
      [ 0, 1, 1 ],
    ]),
];

export default blocks;