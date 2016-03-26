import React from 'react';
import Relay from 'react-relay';

class Main extends React.Component {
  static propTypes = {
    limit: React.PropTypes.number
  }
  static defaultProps = {
    limit: 6
  }
  render() {
    const modifiedArray = this.props.store.podcasts.slice(this.props.store.podcasts.length - this.props.limit, this.props.store.podcasts.lenght);
    const podcasts = modifiedArray.reverse().map((podcast) => {
      return (
        <li key={podcast._id}>
          <a href={podcast.url}>{podcast.title} ({podcast.author})</a>
        </li>
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
          url,
          title,
          author
        }
      }
    `
  }
});

export default Main;
