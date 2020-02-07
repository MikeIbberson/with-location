import Parameters from './parameters';

const isObject = (v) =>
  typeof v === 'object' && Object.keys(v).length;

const isString = (v) => typeof v === 'string' && v.length;

export default (search, navigate) => {
  const params = new Parameters(search);
  const redirect = () => navigate(params.redirectStr());

  return {
    params,
    redirect,

    getFrom(key) {
      if (isObject(key)) return params.populate(key);
      if (isString(key)) return params.get(key);
      return null;
    },

    getAll() {
      const output = {};

      try {
        // eslint-disable-next-line
        for (const pair of params.entries()) {
          // eslint-disable-next-line
          output[pair[0]] = pair[1];
        }
      } catch (e) {
        // noop
      }

      return output;
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

    handleSearch(next) {
      return ({ key, target }) => {
        if (key !== 'Enter') return;

        if (!isString(target.value)) {
          params.delete('search');
        } else {
          params.set('search', target.value);
        }

        params.delete('page');
        redirect();
        next();
      };
    },
  };
};
