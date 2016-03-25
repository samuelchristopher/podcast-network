import Dispatcher from '../dispatcher';
import { RECEIVE_PODCASTS } from '../constants';

export let receivePodcasts = (podcasts) => {
  Dispatcher.dispatch({
    type: RECEIVE_PODCASTS,
    payload: {
      podcasts
    }
  });
}
