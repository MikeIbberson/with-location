import { navigate } from '@reach/router';
import useLocation from '../useLocation';
import Parameters from '../parameters';

jest.mock('@reach/router', () => ({
  navigate: jest.fn(),
}));

describe('useLocation', () => {
  describe('getFrom', () => {
    it('should invoke populate on object', () => {
      const spy = jest.spyOn(
        Parameters.prototype,
        'populate',
      );
      useLocation('?search').getFrom({ foo: 'bar' });
      expect(spy).toHaveBeenCalled();
    });

    it('should invoke get on string', () => {
      const spy = jest.spyOn(Parameters.prototype, 'get');
      useLocation('?search').getFrom('q');
      expect(spy).toHaveBeenCalled();
    });

    it('should return null on empty', () => {
      expect(useLocation('?search').getFrom()).toBeNull();
    });
  });

  describe('pushTo', () => {
    it('should invoke merge', () => {
      Object.defineProperty(window, 'scrollTo', {
        configurable: true,
      });

      window.scrollTo = jest.fn();

      const input = { foo: 'bar' };
      const spy = jest.spyOn(Parameters.prototype, 'merge');
      jest
        .spyOn(Parameters.prototype, 'toString')
        .mockReturnValue('foo=bar');

      useLocation('?search').pushTo(input);
      expect(spy).toHaveBeenCalledWith(input);
      expect(navigate).toHaveBeenCalledWith('?foo=bar');
      expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    });
  });

  describe('clearByName', () => {
    it('should return a function', () => {
      expect(useLocation('?search').clearByName()).toEqual(
        expect.any(Function),
      );
    });

    it('should be used as an event callback', () => {
      const next = jest.fn();
      const spy = jest.spyOn(
        Parameters.prototype,
        'delete',
      );
      const fn = useLocation('?search').clearByName(next);
      fn({
        currentTarget: { name: 'foo' },
        stopPropagation: jest.fn(),
      });

      expect(spy).toHaveBeenCalledWith('foo');
      expect(next).toHaveBeenCalled();
    });
  });

  describe('handleSearch', () => {
    it('should do nothing', () => {
      const fn = useLocation('?search').handleSearch();
      expect(fn({ key: 'Noop' })).toBeUndefined();
    });

    it('should clear the page', () => {
      const next = jest.fn();
      const fn = useLocation('?search').handleSearch(next);
      const spy = jest.spyOn(
        Parameters.prototype,
        'delete',
      );

      fn({
        key: 'Enter',
        currentTarget: { value: 'full!' },
      });
      expect(spy).toHaveBeenCalledWith('page');
      expect(spy).not.toHaveBeenCalledWith('search');
      expect(next).toHaveBeenCalled();
    });

    it('should clear the search query', () => {
      const next = jest.fn();
      const fn = useLocation('?search').handleSearch(next);
      const spy = jest.spyOn(
        Parameters.prototype,
        'delete',
      );

      fn({ key: 'Enter', currentTarget: { value: '' } });
      expect(spy).toHaveBeenCalledWith('search');
      expect(next).toHaveBeenCalled();
    });
  });
});
