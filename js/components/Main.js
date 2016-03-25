import React from 'react';
import { fetchPodcasts } from '../api';

export default class Main extends React.Component {
  componentWillMount() {
    fetchPodcasts();
  }
  render() {
    return (
      <div>
        <h1>Podcasts</h1>
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    );
  }
}
