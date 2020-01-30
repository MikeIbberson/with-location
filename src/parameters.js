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

  merge(a) {
    Object.entries(a).forEach(([key, v]) => {
      if (isEmpty(v)) {
        this.delete(key);
      } else if (Array.isArray(v)) {
        this.set(`${key}`, serializeArray(v));
      } else if (typeof v === 'object') {
        Object.entries(flat(v, { safe: true })).forEach(
          ([name, value]) => {
            this.set(
              `${key}.${name}`,
              serializeArray(value),
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
