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
        console.log(podcasts, this)
        this.setState({
          podcasts,
          loading: false
        })
      })

    console.log('Main component rendered')
  }

  render () {


    const elements = this.state.podcasts.map((podcast) => {
      return <Podcast key={podcast._id} podcast={podcast} />
    })
    return (
      <div>
        <Header />
        {this.state.loading ? "Loading" : "Done"}
        <div className="latest-podcasts">
          <p className="latest-podcasts__label">Latest podcasts</p>
          <div className="podcasts">
            { elements } hi
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
