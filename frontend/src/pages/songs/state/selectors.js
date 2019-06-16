import { createSelector } from 'reselect';
import reducer, { initialState } from './reducer';

export { reducer };

/**
 * Selectors
 */

export const selectSongs = state => state.songs || initialState;

/**
 * Select the actual song items
 */
export const getItems = createSelector(
  selectSongs,
  state => state.items
);
