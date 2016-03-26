import React from 'react';
import Relay from 'react-relay';
import Podcast from './Podcast';
import AddPodcastMutation from "../mutations/addPodcastMutation";

class Main extends React.Component {
  // setLimit(e) {
  //   let limit = Number(e.target.value);
  //   this.props.relay.setVariables({
  //     limit
  //   });
  // }
  handleSubmit(e) {
    e.preventDefault();
    let { title, author, url, date } =  this.refs;

    Relay.Store.commitUpdate(
      new AddPodcastMutation({
        url: url.value,
        date: date.value,
        title: title.value,
        author: author.value,
        store: this.props.store
      })
    )

    url.value =  "";
    date.value =  "";
    title.value =  "";
    author.value =  "";
  }
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
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" placeholder="Title" ref="title"/>
          <input type="text" placeholder="Author" ref="author"/>
          <input type="text" placeholder="Url" ref="url"/>
          <input type="text" placeholder="Date" ref="date"/>
          <button type="submit">Submit</button>
        </form>
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
