import { navigate } from '@reach/router';
import flat from 'flat';
import { isEmpty, serializeArray } from './utils';

export default class extends URLSearchParams {
  populate(a = {}) {
    return Object.entries(a).reduce(
      (acc, [key, value]) =>
        Object.assign(acc, {
          [key]: Array.isArray(value)
            ? this.getAll(`${key}[]`)
            : this.get(key) || value,
        }),
      {},
    );
  }

  serializeAndAssign(key, v) {
    const arr = serializeArray(v);
    if (arr.length) {
      this.set(key, serializeArray(arr));
    } else {
      this.delete(key);
    }
  }

  merge(a) {
    Object.entries(a).forEach(([key, v]) => {
      if (isEmpty(v)) {
        this.delete(key);
      } else if (Array.isArray(v)) {
        this.serializeAndAssign(key, v);
      } else if (typeof v === 'object') {
        Object.entries(flat(v, { safe: true })).forEach(
          ([name, value]) => {
            this.serializeAndAssign(
              `${key}.${name}`,
              value,
            );
          },
        );
      } else {
        this.set(key, v);
      }
    });
  }

  redirect() {
    const str = this.toString();
    navigate(str ? `?${str}` : '?');
  }
}
