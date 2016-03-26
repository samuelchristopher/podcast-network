import React from 'react';
import Relay from 'react-relay';

let Podcast = (props) => (
  <li>
    <a href={props.podcast.url}>{props.podcast.title} ({props.podcast.author})</a>
  </li>
);

Podcast = Relay.createContainer(Podcast, {
  fragments: {
    podcast: () => Relay.QL`
      fragment on Podcast {
        url,
        title,
        author
      }`
  }
});


export default Podcast;
