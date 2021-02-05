import Parameters from './parameters';
import { forEachParam } from './utils';

const isObject = (v) =>
  typeof v === 'object' && Object.keys(v).length;

const isString = (v) => typeof v === 'string' && v.length;

export default (search, navigate) => {
  const params = new Parameters(search);

  const redirect = (prefix) => {
    const query = params.redirectStr();
    const path = prefix ? `${prefix}${query}` : query;
    return navigate(path);
  };

  return {
    params,
    redirect,

    getFrom(key) {
      if (isObject(key)) return params.populate(key);
      if (isString(key)) return params.get(key);
      return null;
    },

    getAll() {
      return forEachParam(params);
    },

    pushTo(values) {
      params.merge(values);
      redirect();
      window.scrollTo(0, 0);
    },

    clearByName(next) {
      return (e) => {
        e.stopPropagation();
        params.delete(e.currentTarget.name);
        redirect();
        next();
      };
    },

    handleSearch(next, redirectPath) {
      return ({ key, target }) => {
        if (key !== 'Enter') return;

        if (!isString(target.value)) {
          params.delete('search');
        } else {
          params.set('search', target.value);
        }

        params.delete('page');
        redirect(redirectPath);
        next();
      };
    },
  };
};
