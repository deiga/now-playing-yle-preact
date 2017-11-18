import { combineReducers } from 'redux';
import {
  REQUEST_CHANNELS,
  RECEIVE_CHANNELS,
  REQUEST_PROGRAMS,
  RECEIVE_PROGRAMS,
  SHOW_GUIDE,
  PLAY_CLIP,
  PLAY_CLIP2,
  fetchServices,
  receiveChannels,
  fetchCurrentPrograms,
  requestPrograms,
  receivePrograms,
  fetchStream,
  playClip2,
} from '../actions';

import store from './../store';

function programs(state = { isFetching: false, items: [], channelItems: [] }, action) {
  switch (action.type) {
    case REQUEST_PROGRAMS:
      fetchCurrentPrograms(store.getState().channels.items.map(c => c.id)).then(result => {
        store.dispatch(receivePrograms(result));
      });
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_PROGRAMS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.programs,
        channelItems: action.programs,
      });
    case SHOW_GUIDE:
      return Object.assign({}, state, {
        isFetching: false,
        items: state.items,
        channelItems: state.items.filter(program => {
          return program.publicationEvent[0].service.id === action.channelId;
        }),
      });
    case PLAY_CLIP:
      fetchStream(action.programId, action.mediaId).then(result => {
        store.dispatch(playClip2(result));
      });
      return Object.assign({}, state, {
        isFetching: true,
        playingProgram: action.programId,
        streamUrl: null,
      });
    case PLAY_CLIP2:
      return Object.assign({}, state, {
        isFetching: false,
        streamUrl: action.streamUrl,
      });
    default:
      return state;
  }
}

function channels(state = { isFetching: false, items: [] }, action) {
  switch (action.type) {
    case REQUEST_CHANNELS:
      fetchServices().then(result => {
        store.dispatch(receiveChannels(result));
        store.dispatch(requestPrograms());
      });
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_CHANNELS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.channels,
      });
    default:
      return state;
  }
}

export default combineReducers({
  programs,
  channels,
});
