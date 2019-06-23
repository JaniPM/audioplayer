import reducer, { initialState } from './reducer';
import {
  loadSongs, loadSongsSuccess, searchSongsSuccess
} from './actions';

describe('songs reducer', () => {
  it('should return the initial state', () => {
    const newState = reducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('should start loader when loading songs', () => {
    const newState = reducer(undefined, loadSongs());
    expect(newState.songsLoading).toBeTruthy();
  });

  it('should stop loader when loading songs succeeded', () => {
    const payload = { list: [{ id: 1 }], total: 1 };
    const state = { ...initialState, loading: true };

    const newState = reducer(state, loadSongsSuccess(payload));

    expect(newState.songsLoading).toBeFalsy();
    expect(newState.songs).toEqual(payload.list);
    expect(newState.total).toBe(payload.total);
  });

  it('should append when loading songs multiple times', () => {
    const origSongs = [{ id: 1 }];
    const payload = { list: [{ id: 2 }], total: 2 };
    const state = { ...initialState, songs: origSongs };

    const newState = reducer(state, loadSongsSuccess(payload));

    expect(newState.songs).toEqual([...origSongs, ...payload.list]);
  });

  it('should reset songs when searching', () => {
    const origSongs = [{ id: 1 }];
    const payload = { list: [{ id: 2 }], total: 2 };
    const state = { ...initialState, songs: origSongs };

    const newState = reducer(state, searchSongsSuccess(payload));

    expect(newState.songs).toEqual(payload.list);
  });
});
