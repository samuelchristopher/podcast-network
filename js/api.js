import request from 'superagent';
import { receivePodcasts } from './actions/serverActions';

export let fetchPodcasts = () => {
  console.log('In API')
  request
    .post('/data', {
      query: `{
        podcasts {
          _id,
          title,
          author,
          url
        }
      }`
    })
    .end((err, res) => {
      if(err) throw err;
      receivePodcasts(res.body.data.podcasts);
    });
};
