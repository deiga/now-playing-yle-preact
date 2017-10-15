import { combineReducers } from 'redux';
import {
  REQUEST_CHANNELS,
  RECEIVE_CHANNELS,
  REQUEST_PROGRAMS,
  RECEIVE_PROGRAMS
} from '../actions';

function programs(state = { isFetching: false, items: [] }, action) {
  switch (action.type) {
    case REQUEST_PROGRAMS:
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
