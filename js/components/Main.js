import React from 'react';
import Relay from 'react-relay';
import Podcast from './podcast/Podcast';
import AddPodcast from './podcast/Add';
import Header from './home/Header';
import Player from './podcast/Player';
// import LatestPodcasts from './home/LatestPodcasts';

class Main extends React.Component {
  // setLimit(e) {
  //   let limit = Number(e.target.value);
  //   this.props.relay.setVariables({
  //     limit
  //   });
  // }

  render() {

    // <h1>Podcasts</h1>
    // <AddPodcast store={this.props.store} />
    // <ul>
    //   {podcasts}
    // </ul>
    // <LatestPodcasts store={this.props.store}/>
    const { edges: podcastsArray } = this.props.store.podcastConnection;
    const podcasts = podcastsArray.reverse().map((edge) => {
      return (
        <Podcast key={edge.node.id} podcast={edge.node} />
      )
    });
    return (
      <div>
        <Header />
        <div className="latest-podcasts">
          <p className="latest-podcasts__label">Latest podcasts</p>
          <div className="podcasts">
            { podcasts }
          </div>
        </div>
        <Player />
      </div>
    );
  }
}

Main = Relay.createContainer(Main, {
  initialVariables: {
    limit: 6
  },
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        id,
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

export default Main;
