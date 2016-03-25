import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import { RECEIVE_PODCASTS } from '../constants';

let _podcasts = [];

class PodcastStore extends EventEmitter {
  constructor(props) {
    super(props);
    Dispatcher.register(action => {
      switch(action.type) {
        case RECEIVE_PODCASTS:
          console.log('in store');
          _podcasts = action.payload.podcasts;
          this.emit('change');
          break;
        default:
          // nothing
      }
    })
  }

  getAll() {
    return _podcasts;
  }
}

export default new PodcastStore();
