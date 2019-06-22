import reducer, { initialState } from './reducer';
import {
  loadSongs, loadSongsSuccess,
} from './actions';

describe('songs reducer', () => {
  it('should return the initial state', () => {
    const newState = reducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('should start loader when loading songs', () => {
    const newState = reducer(undefined, loadSongs());
    expect(newState.loading).toBeTruthy();
  });

  it('should stop loader when loading songs succeeded', () => {
    const payload = { items: [], total: 0 };
    const state = { ...initialState, loading: true };

    const newState = reducer(state, loadSongsSuccess(payload));

    expect(newState.loading).toBeFalsy();
    expect(newState.items).toEqual(payload.items);
    expect(newState.total).toBe(payload.total);
  });
});
