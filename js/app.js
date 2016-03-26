import 'babel-polyfill';

// import Main from './components/Main';
// import AppHomeRoute from './routes/AppHomeRoute';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

// ReactDOM.render(
//   <Main limit={6} />,
//   document.getElementById('root')
// );

console.log(
  Relay.QL`
    query Test {
      podcasts {
        title
      }
    }
  `
)
