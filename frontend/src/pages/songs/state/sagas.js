import {
  put,
  takeLatest,
  call,
  debounce
} from 'redux-saga/effects';
import api from '../../../services/api';
import {
  LOAD_SONGS,
  SEARCH_SONGS,
  LOAD_SONG,
  loadSongsSuccess,
  loadSongsFailed,
  searchSongsSuccess,
  searchSongsFailed,
  loadSongSuccess,
  loadSongFailed,
} from './actions';

const path = 'songs';

function queryString(queryParams) {
  if (!queryParams) {
    return '';
  }
  return `?${Object.keys(queryParams).map(key => `${key}=${queryParams[key]}`).join('&')}`;
}

function querySongs(params) {
  const query = queryString(params);
  return call(api.get, `${path}${query}`);
}

function* fetchSongs(action) {
  try {
    const data = yield querySongs(action.payload);
    yield put(loadSongsSuccess(data));
  } catch (e) {
    yield put(loadSongsFailed());
  }
}

function* fetchSongsWithSearch(action) {
  try {
    const data = yield querySongs(action.payload);
    yield put(searchSongsSuccess(data));
  } catch (e) {
    yield put(searchSongsFailed());
  }
}

function* fetchSong(action) {
  try {
    const data = yield call(api.get, `${path}/${action.payload}`);
    yield put(loadSongSuccess(data));
  } catch (e) {
    yield put(loadSongFailed());
  }
}

export function* loadSongs() {
  yield takeLatest(LOAD_SONGS, fetchSongs);
}

export function* searchSongs() {
  yield debounce(500, SEARCH_SONGS, fetchSongsWithSearch);
}

export function* loadSong() {
  yield takeLatest(LOAD_SONG, fetchSong);
}
