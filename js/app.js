import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import Main from './components/Main';

ReactDOM.render(<Main />, document.getElementById('root'));

console.log(
  Relay.QL`
    {
      podcasts {
        title
      }
    }
  `
);
