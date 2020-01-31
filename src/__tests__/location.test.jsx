import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { withLocation, LocationProvider } from '..';

let Hoc;
const Mock = () => <div />;

const hookDecorators = expect.objectContaining({
  getFrom: expect.any(Function),
  pushTo: expect.any(Function),
  clearByName: expect.any(Function),
  handleSearch: expect.any(Function),
});

beforeAll(() => {
  Enzyme.configure({ adapter: new Adapter() });
});

beforeEach(() => {
  Hoc = withLocation(Mock);
});

describe('withLocation', () => {
  it('should return a high-order function', () => {
    expect(Hoc).toEqual(expect.any(Function));
  });

  it('should return a high-order function', () => {
    expect(
      mount(<Hoc />)
        .find(Mock)
        .props(),
    ).toMatchObject(hookDecorators);
  });
});

describe('LocationProvider', () => {
  it('should inject props to the children', () => {
    const fn = jest.fn().mockImplementation(() => null);

    mount(<LocationProvider>{fn}</LocationProvider>);
    expect(fn).toHaveBeenCalledWith(hookDecorators);
  });
});
