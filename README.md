
<h1>🗺️ with-location</h1>
<p>
<img  src="https://github.com/MikeIbberson/with-location/workflows/Node%20CI/badge.svg"  alt="Status" />
<a href='https://coveralls.io/github/MikeIbberson/with-location?branch=master'><img src='https://coveralls.io/repos/github/MikeIbberson/with-location/badge.svg?branch=master' alt='Coverage Status' /></a>
<a href="https://www.codacy.com/manual/MikeIbberson/with-location?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=MikeIbberson/with-location&amp;utm_campaign=Badge_Grade"><img src="https://api.codacy.com/project/badge/Grade/770dd0b0d4f74a32921400c0504f8f33"/></a>
<img src='https://bettercodehub.com/edge/badge/MikeIbberson/with-location?branch=master'>
</p> 

<p>Custom Provider and HOC components for <a href="https://github.com/reach/router">@reach/router</a></p>

<h2>Available injected/inherited props</h2>

| Name           | Descriptions                                                                    | Args                 |
| -------------- | ------------------------------------------------------------------------------- | -------------------- |
| `getFrom`      | Get query value as string or object (will return a merged object)               | `object` or `string` |
| `pushTo`       | Add a new value to the query string                                             | `any`                |
| `clearByName`  | Create a curried callback for clear-style UI elements                           | `fn` => `event`      |
| `handleSearch` | Create a submit callback for handling search inputs (will delete paged queries) | `fn` => `event`      |

<h2>Example</h2>

```Javascript
import React from 'react';
import { withLocation, LocationProvider } from 'with-location';

const AsHoc = withLocation((props) => {
  // props now includes the location decorators
  return null;
});

const AsComponent = (props) => (
  <LocationProvider>
    {(utils) => {
      // utils now includes the location decorators
      return null;
    }}
  </LocationProvider>
);
```


