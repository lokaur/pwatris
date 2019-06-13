const KEY = 'PWATRIS';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);
  } catch {
    // ignore
  }
};