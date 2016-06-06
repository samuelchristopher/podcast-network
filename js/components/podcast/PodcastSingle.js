import React from 'react'
import request from 'superagent'
import Header from '../home/Header'

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
    return (
      <div>
        <Header />
        <div className="latest-podcasts">
          <p className="latest-podcasts__label">By { podcast.author } on { podcast.date }</p>
          <div className="podcasts">
            <h2 className="podcastSingle__title">{ podcast.title }</h2>
            <audio src={ podcast.url } controls></audio>
          </div>
        </div>
      </div>
    )
  }
}
