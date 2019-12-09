import React from 'react';
import PropTypes from 'prop-types';
import { Location } from '@reach/router';
import useLocation from './useLocation';

export const LocationProvider = ({ children }) => (
  <Location>
    {({ location }) => {
      const methods = useLocation(location.search);
      return children(methods);
    }}
  </Location>
);

LocationProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export const withLocation = (Component) => (props) => (
  <Location>
    {({ location }) => {
      const methods = useLocation(location.search);
      return <Component {...props} {...methods} />;
    }}
  </Location>
);
