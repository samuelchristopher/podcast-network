import Main from './components/Main'
import PodcastSingle from './components/podcast/PodcastSingle'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'



ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Main} />
    <Route path="/podcast/:slug" component={PodcastSingle} />
  </Router>
  ,
  document.getElementById('root')
)
