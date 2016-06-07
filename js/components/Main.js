import React from 'react';
import Podcast from './podcast/Podcast';
import AddPodcast from './podcast/Add';
import Header from './home/Header';
import request from 'superagent';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import CircularProgress from 'material-ui/CircularProgress'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class Main extends React.Component {

  constructor () {
    super();
    this.state = {
      podcasts: [],
      loading: true
    }
  }

  componentDidMount () {
    request.get('/api/all-podcasts')
      .then((response) => {
        const { podcasts } = response.body
        this.setState({
          podcasts,
          loading: false
        })
      })
  }

  render () {

    const podcasts = this.state.podcasts.reverse().map((podcast) => {
      return <Podcast key={podcast._id} podcast={podcast} />
    })

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <Header />
          <ReactCSSTransitionGroup
            transitionName="route"
            transitionEnterTimeout={600}
            transitionLeaveTimeout={400}
            transitionAppearTimeout={600}
            transitionAppear={true}
            className="latest-podcasts"
            component="div"
            >
            <p className="latest-podcasts__label">Latest podcasts</p>
            <ReactCSSTransitionGroup
              transitionName="podcastLoad"
              transitionEnterTimeout={600}
              transitionLeaveTimeout={400}
              className="podcasts"
              component="div"
              >
              { this.state.loading ? <CircularProgress size={1.5} color="#df405a" /> : podcasts }
            </ReactCSSTransitionGroup>
          </ReactCSSTransitionGroup>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
