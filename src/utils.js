export const isEmpty = (v) =>
  v === undefined ||
  v === null ||
  v === 'undefined' ||
  v === 'null' ||
  (typeof v === 'string' && !v.length) ||
  (Array.isArray(v) && !v.length);

export const serializeArray = (v) =>
  Array.isArray(v) ? v.join(',') : v;
