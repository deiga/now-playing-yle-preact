import { combineReducers } from 'redux';
import {
  REQUEST_CHANNELS,
  RECEIVE_CHANNELS,
  REQUEST_PROGRAMS,
  RECEIVE_PROGRAMS,
  SHOW_GUIDE,
  fetchServices,
  receiveChannels,
  fetchCurrentPrograms,
  requestPrograms,
  receivePrograms
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
        channelItems: state.items.filter((program) => {return program.service.id === action.channelId })
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
