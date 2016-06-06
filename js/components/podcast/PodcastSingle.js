import React from 'react'
import request from 'superagent'
import Header from '../home/Header'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import CircularProgress from 'material-ui/CircularProgress'

export default class PodcastSingle extends React.Component {
  constructor() {
    super();
    this.state = {
      podcast: '',
      loading: true
    }
  }
  componentDidMount () {
    const { slug } = this.props.routeParams
    request.get(`http://localhost:3000/api/podcast/${slug}`)
      .then((response) => {
        const { podcast } = response.body
        this.setState({
          podcast,
          loading: false
        })
      })
  }
  render () {
    const { podcast } = this.state
    let thingToShow = ''

    if (this.state.loading) {
      thingToShow = <CircularProgress size={1.5} color="#df405a" />
    } else {
      thingToShow = (
        <div>
          <h2 className="podcastSingle__title">{ podcast.title }</h2>
          <audio src={ podcast.url } controls></audio>
        </div>
      )
    }
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <Header />
          <div className="latest-podcasts">
            <p className="latest-podcasts__label">By { podcast.author } on { podcast.date }</p>
            <div className="podcasts">
              { thingToShow }
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
