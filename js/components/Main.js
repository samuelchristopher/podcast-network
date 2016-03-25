import React from 'react';
import { fetchPodcasts } from '../api';
import PodcastStore from '../stores/podcastStore';

let getState = () => {
  return {
    podcasts: PodcastStore.getAll()
  }
};

class Main extends React.Component {
  static propTypes = {
    limit: React.PropTypes.number
  }

  static defaultProps = {
    limit: 6
  }

  state =  getState();

  onChange = () => {
    this.setState(getState());
  }
  componentDidMount() {
    fetchPodcasts();
    PodcastStore.on('change', this.onChange);
  }
  componentWillUnmount() {
    PodcastStore.removeListener('change', this.onChange);
  }
  render() {
    const modifiedArray = this.state.podcasts.slice(this.state.podcasts.length - this.props.limit, this.state.podcasts.lenght);
    const podcasts = modifiedArray.reverse().map((podcast) => {
      return (
        <li key={podcast._id}>
          <a href={podcast.url}>{podcast.title} ({podcast.author})</a>
        </li>
      )
    })

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

export default Main;
