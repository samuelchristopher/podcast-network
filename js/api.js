import request from 'superagent';
import { receivePodcasts } from './actions/serverActions';

export let fetchPodcasts = () => {
  console.log('In API')
  request
    .get('data?query={podcasts{_id, title,author}}')
    .end((err, res) => {
      if(err) throw err;
      receivePodcasts(res.body.data);
    });
};
