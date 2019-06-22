import {
  LOAD_SONGS, LOAD_SONGS_SUCCESS
} from './actions';

/**
 * Songs reducer
 */
export const initialState = {
  loading: false,
  songs: [],
  total: 0,
};

export default function (state = initialState, action) {
  const stateTree = {
    [LOAD_SONGS]: () => ({ ...state, loading: true }),
    [LOAD_SONGS_SUCCESS]: () => ({
      ...state,
      loading: false,
      songs: action.payload.items,
      total: action.payload.total,
    }),
    default: () => state,
  };
  return (stateTree[action.type] || stateTree.default)();
}
