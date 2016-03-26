import React from 'react';
import Relay from 'react-relay';
import AddPodcastMutation from "../../mutations/addPodcastMutation";

class AddPodcast extends React.Component {
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
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" placeholder="Title" ref="title"/>
        <input type="text" placeholder="Author" ref="author"/>
        <input type="text" placeholder="Url" ref="url"/>
        <input type="text" placeholder="Date" ref="date"/>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default AddPodcast;
