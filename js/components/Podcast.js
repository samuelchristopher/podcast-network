import React from 'react';

let Podcast = (props) => (
  <li>
    <a href={props.podcast.url}>{props.podcast.title} ({props.podcast.author})</a>
  </li>
);

export default Podcast;
