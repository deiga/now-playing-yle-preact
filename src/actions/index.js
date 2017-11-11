import fetchp from 'fetch-jsonp';
import { baseUrl, appId, appKey, secret } from '../config.json';

// Action types
export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
export const RECEIVE_PROGRAMS = 'REQUEST_PROGRAMS';
export const REQUEST_CHANNELS = 'REQUEST_CHANNELS';
export const REQUEST_PROGRAMS = 'REQUEST_PROGRAMS';

export const PLAY_CLIP = 'PLAY_CLIP';
export const SHOW_GUIDE = 'SHOW_GUIDE';

// Action creators
export function requestPrograms() {
  return { type: REQUEST_PROGRAMS };
}

export function receivePrograms() {
  return { type: RECEIVE_PROGRAMS };
}

export function requestChannels() {
  return { type: REQUEST_CHANNELS };
}

export function receiveChannels(channels) {
  return { type: RECEIVE_CHANNELS, channels };
}

export function playClip(programId, mediaId) {
  return { type: PLAY_CLIP, programId, mediaId };
}

export function showGuide(channelId) {
  return { type: SHOW_GUIDE, channelId };
}

/**
 * Fetch the current TV shows using JSONP and fetch JSONP polyfill.
 *
 * @param {Array<String>} [services=[]] - a string array of YLE service IDs o use as filter
 * @return {Array<Object>} YLE program metadata in unparsed form
 */
async function fetchCurrentPrograms(services = []) {
  const url = new URL(`${baseUrl}/programs/schedules/now.json`);
  const params = url.searchParams;
  params.set('app_id', appId);
  params.set('app_key', appKey);
  params.set('service', services.join(','));
  params.set('start', '-1');
  params.set('end', '10');

  // Fix the jsonp callback function name for service worker compatibility
  const options = { jsonpCallbackFunction: 'jsonp_options' };

  const response = await fetchp(url.href, options);
  // TODO Validate response
  const json = await response.json();
  return json.data;
}

/**
 * Fetch the YLE services using JSONP and fetch JSONP polyfill.
 *
 * @param {String} [type='TVChannel'] - the type of services to fetch
 * @return {Array<Object>} YLE service metadata in unparsed form
 */
export async function fetchServices(type = 'TVChannel') {
  const url = new URL(`${baseUrl}/programs/services.json`);
  const params = url.searchParams;
  params.set('app_id', appId);
  params.set('app_key', appKey);
  params.set('type', type);

  // Fix the jsonp callback function name for service worker compatibility
  const options = { jsonpCallbackFunction: 'jsonp_services' };

  let response;
  try {
    response = await fetchp(url.href, options);
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.warn('hoi', error);
  }
}

/**
 * Fetch the stream URL and metadata using JSONP and fetch JSONP polyfill.
 *
 * @param {String} programId - the id of the program
 * @param {String} mediaId - the id of the media
 * @return {Object} The streaming metadata, including URL etc.
 */
export async function fetchStream(programId, mediaId) {
  const url = new URL(`${baseUrl}/media/playouts.json`);
  const params = url.searchParams;
  params.set('app_id', appId);
  params.set('app_key', appKey);
  params.set('program_id', programId);
  params.set('media_id', mediaId);
  params.set('protocol', 'HLS');

  // Fix the jsonp callback function name for service worker compatibility
  const options = { jsonpCallbackFunction: 'jsonp_stream' };

  const response = await fetchp(url.href, options);
  // TODO Validate response
  const json = await response.json();
  return json.data[0];
}
