import React from 'react';
import { Link } from 'react-router';

class Player extends React.Component {
  render() {
    return (
      <div  className="container" ref="container">
        <audio id="music" ref="music" preload="true">
          <source src={this.props.podcast.url}></source>
	      </audio>
        <div id="audioplayer">
          <div id="timeline" ref="timeline">
  		      <div id="playhead" ref="playhead"></div>
          </div>
        </div>
        <div className="podcast__controls">
          <Link id="pButton" ref="pButton" className="podcast__controls--download" to={`/podcast/${this.props.podcast.slug}`}/>
        </div>
      </div>
    );
  }
}

export default Player;
