import Dispatcher from '../dispatcher';
import { RECEIVE_PODCASTS } from '../constants';

export let receivePodcasts = (podcasts) => {
  console.log('In Actions')
  Dispatcher.dispatch({
    type: RECEIVE_PODCASTS,
    payload: {
      podcasts
    }
  });
}
