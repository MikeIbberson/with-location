/* eslint-disable func-names */
import flat from 'flat';
import {
  isEmpty,
  serializeArray,
  asEmpty,
  asInverted,
  forEachParam,
} from './utils';

/**
 * @NOTE
 * Class inheritance was not working in production envs
 * Prototypes seem to register more consistently.
 */

URLSearchParams.prototype.populate = function(a = {}) {
  return Object.entries(a).reduce(
    (acc, [key, value]) =>
      Object.assign(acc, {
        [key]: Array.isArray(value)
          ? this.getAll(`${key}[]`)
          : this.get(key) || value,
      }),
    {},
  );
};

URLSearchParams.prototype.serializeAndAssign = function(
  key,
  v,
) {
  const arr = serializeArray(v);
  if (arr.length) {
    this.set(asInverted(key, arr), asEmpty(arr));
  } else {
    this.delete(key);
  }
};

URLSearchParams.prototype.merge = function(a) {
  Object.entries(a).forEach(([key, v]) => {
    if (isEmpty(v)) {
      this.delete(key);
    } else if (Array.isArray(v)) {
      this.serializeAndAssign(key, v);
    } else if (typeof v === 'object') {
      Object.entries(flat(v, { safe: true })).forEach(
        ([name, value]) => {
          this.serializeAndAssign(`${key}.${name}`, value);
        },
      );
    } else {
      this.set(asInverted(key, v), asEmpty(v));
    }
  });
};

URLSearchParams.prototype.redirectStr = function() {
  const output = forEachParam(this);
  const str = Object.entries(output)
    .map(([key, value]) => {
      const left = encodeURIComponent(key);
      return value
        ? `${left}=${encodeURIComponent(value)}`
        : left;
    })
    .join('&');

  return str ? `?${str}` : '?';
};

export default URLSearchParams;
