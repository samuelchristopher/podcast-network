import React from 'react';
import Player from './Player';

class Podcast extends React.Component {
    render() {
      const { url, date, title, author, imgUrl } = this.props.podcast;
      const bgStyles = {
        backgroundImage: `url(${imgUrl})`
      };


      return (
        <div>
          <div className={imgUrl ? 'podcast' : 'podcast podcast-2'}>
            <div className="podcast__gradient"></div>
            <div className="podcast__image" style={bgStyles}></div>
            <div className="podcast__info">
              <h3 className="podcast__info--date">{date}</h3>
              <h2 className="podcast__info--title">{title}</h2>
              <h4 className="podcast__info--author">{author}</h4>
            </div>
            <Player podcast={this.props.podcast}/>
          </div>
        </div>
      );
    }
}


export default Podcast;
