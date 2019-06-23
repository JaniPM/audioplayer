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

export const getSelectedSong = createSelector(
  selectState,
  state => state.selectedSong
);
