import { put, takeLatest, call } from 'redux-saga/effects';
import api from '../../../services/api';
import {
  LOAD_SONGS,
  LOAD_SONG,
  loadSongsSuccess,
  loadSongsFailed,
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

function* fetchSongs(action) {
  console.log(action);
  try {
    const query = queryString(action.payload);
    const data = yield call(api.get, `${path}${query}`);
    yield put(loadSongsSuccess(data));
  } catch (e) {
    yield put(loadSongsFailed());
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

export function* loadSong() {
  yield takeLatest(LOAD_SONG, fetchSong);
}
