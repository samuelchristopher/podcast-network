import React from 'react';
import Podcast from './podcast/Podcast';
import AddPodcast from './podcast/Add';
import Header from './home/Header';
import request from 'superagent';

class Main extends React.Component {

  constructor () {
    super();
    this.state = {
      podcasts: [],
      loading: true
    }
  }

  componentDidMount () {
    request.get('http://localhost:3000/api/all-podcasts')
      .then((response) => {
        const { podcasts } = response.body
        this.setState({
          podcasts,
          loading: false
        })
      })
  }

  render () {

    const podcasts = this.state.podcasts.map((podcast) => {
      return <Podcast key={podcast._id} podcast={podcast} />
    })

    // TODO: Add Circular progress from Material-ui
    return (
      <div>
        <Header />
        <div className="latest-podcasts">
          <p className="latest-podcasts__label">Latest podcasts</p>
          <div className="podcasts">
            { this.state.loading ? <h2>Loading</h2> : podcasts }
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
