import React from 'react';
import PropTypes from 'prop-types';
import { Location } from '@reach/router';
import useLocation from './useLocation';

export const LocationProvider = ({ children }) => (
  <Location>
    {({ location, navigate }) => {
      const methods = useLocation(
        location.search,
        navigate,
      );

      return children(methods);
    }}
  </Location>
);

LocationProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export const withLocation = (Component) => (props) => (
  <Location>
    {({ location, navigate }) => {
      const methods = useLocation(
        location.search,
        navigate,
      );

      return (
        <Component
          navigate={navigate}
          location={location}
          {...props}
          {...methods}
        />
      );
    }}
  </Location>
);
