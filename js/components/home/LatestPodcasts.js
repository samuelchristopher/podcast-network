import React from 'react';
import Podcast from '../podcast/Podcast';
import Relay from 'react-relay';

class LatestPodcasts extends React.Component {
  render() {
    const { edges: podcastsArray } = this.props.store.podcastConnection;
    const podcasts = podcastsArray.reverse().map((edge) => {
      return (
        <Podcast key={edge.node.id} podcast={edge.node} />
      )
    });
    return (
      <div className="latest-podcasts">
        <p className="latest-podcasts__label">Latest podcasts</p>
        <div className="podcasts">
          { podcasts }
        </div>
      </div>
    );
  }
}

LatestPodcasts = Relay.createContainer(LatestPodcasts, {
  initialVariables: {
    limit: 2
  },
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        podcastConnection(last: $limit) {
          edges {
            node {
              id,
              ${Podcast.getFragment('podcast')}
            }
          }
        }
      }
    `
  }
});

export default LatestPodcasts;
