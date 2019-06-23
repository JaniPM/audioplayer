import {
  LOAD_SONGS,
  LOAD_SONGS_SUCCESS,
  LOAD_SONGS_FAILED,
  SEARCH_SONGS,
  SEARCH_SONGS_SUCCESS,
  SEARCH_SONGS_FAILED,
  LOAD_SONG,
  LOAD_SONG_SUCCESS,
  LOAD_SONG_FAILED
} from './actions';

/**
 * Songs reducer
 */
export const initialState = {
  songs: [],
  total: 0,
  selectedSong: null,
  songsLoading: false,
  songLoading: false,
  searching: false,
};

export default function (state = initialState, action) {
  const stateTree = {
    [LOAD_SONGS]: () => ({ ...state, songsLoading: true }),
    [LOAD_SONGS_SUCCESS]: () => ({
      ...state,
      loading: false,
      songs: [...state.songs, ...action.payload.list],
      total: action.payload.total,
    }),
    [LOAD_SONGS_FAILED]: () => ({ ...state, songsLoading: false }),
    [SEARCH_SONGS]: () => ({ ...state, searching: true }),
    [SEARCH_SONGS_SUCCESS]: () => ({
      ...state,
      searching: false,
      songs: action.payload.list,
      total: action.payload.total,
    }),
    [SEARCH_SONGS_FAILED]: () => ({ ...state, searching: false }),
    [LOAD_SONG]: () => ({ ...state, songLoading: true }),
    [LOAD_SONG_SUCCESS]: () => ({
      ...state,
      songLoading: false,
      selectedSong: action.payload,
    }),
    [LOAD_SONG_FAILED]: () => ({ ...state, songLoading: false }),
    default: () => state,
  };
  return (stateTree[action.type] || stateTree.default)();
}
