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
export const getItems = createSelector(
  selectState,
  state => state.items
);
