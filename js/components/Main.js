import React from 'react';
import Relay from 'react-relay';
import Podcast from './Podcast';

class Main extends React.Component {
  // setLimit(e) {
  //   let limit = Number(e.target.value);
  //   this.props.relay.setVariables({
  //     limit
  //   });
  // }
  render() {
    const { edges: podcastsArray } = this.props.store.podcastConnection;
    const podcasts = podcastsArray.reverse().map((edge) => {
      return (
        <Podcast key={edge.node.id} podcast={edge.node} />
      )
    });
    return (
      <div>
        <h1>Podcasts</h1>
        // <select onChange={this.setLimit.bind(this)}>
        //   <option value="5">5</option>
        //   <option value="10" selected>10</option>
        // </select>
        <ul>
          {podcasts}
        </ul>
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
