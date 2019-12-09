import Parameters from '../parameters';

const get = jest.spyOn(URLSearchParams.prototype, 'get');
const getAll = jest.spyOn(
  URLSearchParams.prototype,
  'getAll',
);

const set = jest.spyOn(URLSearchParams.prototype, 'set');
const remove = jest.spyOn(
  URLSearchParams.prototype,
  'delete',
);

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Parameters', () => {
  describe('populate', () => {
    it('should populate values in an object by key-matching', () => {
      const input = { friends: [], name: '', age: 21 };
      const friends = ['fred', 'mary'];
      const name = 'dan';
      const params = new Parameters();

      get.mockReturnValueOnce(name);
      getAll.mockReturnValue(friends);

      expect(params.populate(input)).toMatchObject({
        age: 21,
        friends,
        name,
      });
    });
  });

  describe('merge', () => {
    it('should manipulate query string based on target object state', () => {
      const colleagues = ['hanna', 'bruce'];
      const name = 'mark';
      new Parameters().merge({
        friends: [],
        colleagues,
        name,
        age: null,
      });

      expect(remove).toHaveBeenCalledWith('friends');
      expect(set).toHaveBeenCalledWith(
        'colleagues[]',
        colleagues,
      );

      expect(set).toHaveBeenCalledWith('name', name);
      expect(remove).toHaveBeenCalledWith('age');
    });
  });
});
