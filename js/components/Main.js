import React from 'react';
import Relay from 'react-relay';
import Podcast from './Podcast';

class Main extends React.Component {
  render() {
    const { podcasts: podcastsArray } = this.props.store;
    const podcasts = podcastsArray.map((podcast) => {
      return (
        <Podcast key={podcast._id} podcast={podcast} />
      )
    });
    return (
      <div>
        <h1>Podcasts</h1>
        <ul>
          {podcasts}
        </ul>
      </div>
    );
  }
}

Main = Relay.createContainer(Main, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        podcasts {
          _id,
          ${Podcast.getFragment('podcast')}
        }
      }
    `
  }
});

export default Main;
