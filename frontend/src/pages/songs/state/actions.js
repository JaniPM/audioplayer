/*
 * Action types
 */

export const LOAD_SONGS = '[Songs] Load songs';
export const LOAD_SONGS_SUCCESS = '[Songs] Load songs success';
export const LOAD_SONGS_FAILED = '[Songs] Load songs failed';
export const LOAD_SONG = '[Songs] Load song';
export const LOAD_SONG_SUCCESS = '[Songs] Load song success';
export const LOAD_SONG_FAILED = '[Songs] Load song failed';

/*
 * Action creators
 */

export function loadSongs(params) {
  return { type: LOAD_SONGS, payload: params };
}

export function loadSongsSuccess(payload) {
  return { type: LOAD_SONGS_SUCCESS, payload };
}

export function loadSongsFailed() {
  return { type: LOAD_SONG_FAILED };
}

export function loadSong(id) {
  return { type: LOAD_SONG, payload: id };
}

export function loadSongSuccess(payload) {
  return { type: LOAD_SONG_SUCCESS, payload };
}

export function loadSongFailed() {
  return { type: LOAD_SONG_FAILED };
}
