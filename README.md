
<h1>🗺️ with-location</h1>
<p>
<img  src="https://github.com/MikeIbberson/with-location/workflows/Node%20CI/badge.svg"  alt="Status" />
<a href='https://coveralls.io/github/MikeIbberson/with-location?branch=master'><img src='https://coveralls.io/repos/github/MikeIbberson/with-location/badge.svg?branch=master' alt='Coverage Status' /></a>
<img src='https://bettercodehub.com/edge/badge/MikeIbberson/with-location?branch=master'>
</p> 

<p>Custom Provider and HOC components for @reach/router</p>

```Javascript
import React from 'react';
import { withLocation, LocationProvider } from 'with-location';

const AsHoc = withLocation((props) => {
  // props now includes the location decorators
  return null;
})

const AsComponent = (props) => (
  <LocationProvider>
    {(utils) => {
      // utils now includes the location decorators
      return null;
    }}
  </LocationProvider>
)
```


