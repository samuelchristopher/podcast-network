import Relay from 'react-relay';

class AddPodcastMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation { addPodcast }
    `;
  }

  getVariables() {
    let { url, date, title, author } = this.props;
    return {
      url,
      date,
      title,
      author
    }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddPodcastPayload {
        podcastEdge,
        store { podcastConnection }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'store',
      parentID: this.props.store.id,
      connectionName: 'podcastConnection',
      edgeName: 'podcastEdge',
      rangeBehaviors: {
        '': 'append',
      }
    }]
  }
}

export default AddPodcastMutation;
