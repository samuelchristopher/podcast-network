import Main from './components/Main'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'



ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Main} />
  </Router>
  ,
  document.getElementById('root')
)
