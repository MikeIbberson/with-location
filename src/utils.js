export const isEmpty = (v) =>
  v === undefined ||
  v === null ||
  v === 'undefined' ||
  v === 'null' ||
  (typeof v === 'string' && !v.length) ||
  (Array.isArray(v) && !v.length);

export const serializeArray = (v) =>
  Array.isArray(v) ? v.join(',') : v;

export const asEmpty = (v) =>
  v === '*' || v === '!*' ? '' : v;

export const asInverted = (key, v) =>
  v === '!*' ? `!${key}` : key;

export const forEachParam = (instance) => {
  const output = {};

  try {
    // eslint-disable-next-line
    for (const pair of instance.entries()) {
      // eslint-disable-next-line
      output[pair[0]] = pair[1];
    }
  } catch (e) {
    // noop
  }

  return output;
};
