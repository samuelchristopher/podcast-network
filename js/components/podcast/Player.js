import React from 'react';

class Player extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    let { timeline, playhead, container } = this.refs;
    let timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
    this.setState({
      timelineWidth
    });
  }

  handleReady(e) {
    let duration = this.refs.music.duration;
    console.log('ready', duration);

    this.setState({
     duration,
     onplayhead: false
    })
  }
  timeUpdate(e) {
    console.log('timeupdate...')
    let { music, playhead, pButton } = this.refs;
    var playPercent = this.state.timelineWidth * (music.currentTime / this.state.duration);
	  playhead.style.marginLeft = playPercent + "px";
	  if (music.currentTime == this.state.duration) {
		  pButton.className = "";
		  pButton.className = "play";
	  }
  }
  handleClick(e) {
    console.log('clicked!');
    (()=> {
      this.moveplayhead(e);
    })()

    let { music } = this.refs;
//     console.log(music.currentTime, this.state.duration * this.clickPercent(e));
    music.currentTime = this.state.duration * this.clickPercent(e)
  }
  moveplayhead(e) {
    console.log('moving play head...')
    let { timeline, playhead } = this.refs;
    let { timelineWidth } = this.state;
    var newMargLeft = e.pageX - timeline.offsetLeft;
	  if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
		  playhead.style.marginLeft = newMargLeft + "px";
	  }
	  if (newMargLeft < 0) {
		  playhead.style.marginLeft = "0px";
	  }
	  if (newMargLeft > timelineWidth) {
  		playhead.style.marginLeft = timelineWidth + "px";
  	}
  }
  clickPercent(e) {
    let { timeline } = this.refs;
    return (e.pageX - timeline.offsetLeft) / this.state.timelineWidth;
  }
  handleMouseDown(e) {
    console.log('mousedown...')
    this.setState({
      onplayhead: true
    })
    let { container, music } = this.refs;
  }
  play(e) {
    let { music, pButton }= this.refs;
    console.log(pButton);
    // start music
	  if (music.paused) {
  		music.play();
		  // remove play, add pause
		  pButton.className = "";
		  pButton.className = "pause";
	  } else { // pause music
  		music.pause();
  		// remove pause, add play
  		pButton.className = "";
  		pButton.className = "play";
  	}
  }
  handleMouseUp(e) {
    console.log('mouseup..')
    let { onplayhead, duration } = this.state;
    let { container, music } = this.refs;
    console.log(container);
    if (onplayhead == true) {
      (()=> {
        this.moveplayhead(e);
      })()
		  // change current time
		  music.currentTime = duration * this.clickPercent(e);
		  music.addEventListener('timeupdate', this.timeUpdate.bind(this), false);
	  }
    this.setState({
      onplayhead: false
    });
  }
  render() {
    return (
      <div onMouseUp={this.handleMouseUp.bind(this)} className="container" ref="container">
        <audio id="music" onCanPlayThrough={this.handleReady.bind(this)} onTimeUpdate={this.timeUpdate.bind(this)} ref="music" preload="true">
          <source src="http://www.alexkatz.me/codepen/music/interlude.mp3"></source>
  			  <source src="http://www.alexkatz.me/codepen/music/interlude.ogg"></source>
	      </audio>
        <div id="audioplayer">
	        <button id="pButton" ref="pButton" className="play" onClick={this.play.bind(this)}></button>
          <div id="timeline" ref="timeline" onClick={this.handleClick.bind(this)}>
  		      <div id="playhead" onMouseDown={this.handleMouseDown.bind(this)} ref="playhead"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;
