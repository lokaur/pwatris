let pressedKeys = {};

const add = (code) => {
  pressedKeys[ code.toLowerCase() ] = true;
};

const remove = (code) => {
  delete pressedKeys[ code.toLowerCase() ];
};

const reset = () => {
  pressedKeys = {};
};

const isPressed = (...keys) => keys.reduce((defined, key) => defined || pressedKeys[ key ] !== undefined, false);

export default {
  add,
  remove,
  reset,
  isPressed,
};