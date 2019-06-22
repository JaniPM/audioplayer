/*
 * Action types
 */

export const LOAD_SONGS = '[Songs] Load songs';
export const LOAD_SONGS_SUCCESS = '[Songs] Load songs success';
export const LOAD_SONGS_FAILED = '[Songs] Load songs failed';

/*
 * Action creators
 */

export function loadSongs() {
  return { type: LOAD_SONGS };
}

export function loadSongsSuccess(payload) {
  return { type: LOAD_SONGS_SUCCESS, payload };
}

export function loadSongsFailed() {
  return { type: LOAD_SONGS_FAILED };
}
