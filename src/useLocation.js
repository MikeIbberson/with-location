import Parameters from './parameters';

const isObject = (v) =>
  typeof v === 'object' && Object.keys(v).length;

const isString = (v) => typeof v === 'string' && v.length;

export default (search) => {
  const params = new Parameters(search);

  return {
    params,

    getFrom(key) {
      if (isObject(key)) return params.populate(key);
      if (isString(key)) return params.get(key);
      return null;
    },

    pushTo(values) {
      params.merge(values);
      params.redirect();
      window.scrollTo(0, 0);
    },

    clearByName(next) {
      return (e) => {
        e.stopPropagation();
        params.delete(e.currentTarget.name);
        params.redirect();
        next();
      };
    },

    handleSearch(next) {
      return ({ key, target }) => {
        if (key !== 'Enter') return;

        if (!isString(target.value)) {
          params.delete('search');
        } else {
          params.set('search', target.value);
        }

        params.delete('page');
        params.redirect();
        next();
      };
    },
  };
};
