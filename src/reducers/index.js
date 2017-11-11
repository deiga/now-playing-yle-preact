import { combineReducers } from 'redux';
import {
  REQUEST_CHANNELS,
  RECEIVE_CHANNELS,
  REQUEST_PROGRAMS,
  RECEIVE_PROGRAMS,
  fetchServices,
  receiveChannels,
  fetchCurrentPrograms,
  receivePrograms
} from '../actions';

import store from './../store';

function programs(state = { isFetching: false, items: [] }, action) {
  switch (action.type) {
    case REQUEST_PROGRAMS:
      fetchCurrentPrograms().then(result => {
        store.dispatch(receivePrograms(result));
      });
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_PROGRAMS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.programs,
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
