import { put, takeLatest, call } from 'redux-saga/effects';
import api from '../../../services/api';
import {
  LOAD_SONGS,
  loadSongsSuccess,
  loadSongsFailed,
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

// eslint-disable-next-line import/prefer-default-export
export function* loadSongs() {
  yield takeLatest(LOAD_SONGS, fetchSongs);
}
