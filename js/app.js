import Main from './components/Main'
import PodcastSingle from './components/podcast/PodcastSingle'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import AddPodcast from './components/podcast/AddPodcast'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()



ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Main} />
    <Route path="/podcast/:slug" component={PodcastSingle} />
    <Route path="/add-new-podcast" component={AddPodcast} />
  </Router>
  ,
  document.getElementById('root')
)
