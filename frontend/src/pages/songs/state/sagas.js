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

function* fetchSongs() {
  try {
    const data = yield call(api.get, path);
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
