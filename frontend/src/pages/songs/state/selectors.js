import { createSelector } from 'reselect';
import reducer, { initialState } from './reducer';

export { reducer };

/**
 * Selectors
 */

export const selectState = state => state.songs || initialState;

/**
 * Select the actual song items
 */
export const getSongs = createSelector(
  selectState,
  state => state.songs
);

export const getHasMore = createSelector(
  selectState,
  state => state.songs.length < state.total
);

export const getSelectedSong = createSelector(
  selectState,
  state => state.selectedSong
);

export const getSongsLoading = createSelector(
  selectState,
  state => state.songsLoading
);

export const getSongLoading = createSelector(
  selectState,
  state => state.songLoading
);

export const getSearching = createSelector(
  selectState,
  state => state.searching
);
