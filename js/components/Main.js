import React from 'react';
import { fetchPodcasts } from '../api';
import PodcastStore from '../stores/podcastStore';

let getState = () => {
  return {
    podcasts: PodcastStore.getAll()
  }
};

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state =  getState();
    this.onChange = this.onChange.bind(this);
  }
  onChange() {
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
    const podcasts = this.state.podcasts.map((podcast) => {
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
