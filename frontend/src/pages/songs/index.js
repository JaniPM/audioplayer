import React, { memo, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import useInjectReducer from '../../hooks/useInjectReducer';
import reducer from './state/reducer';
import { selectSongs } from './state/selectors';
import {
  loadSongs
} from './state/actions';
import SearchBox from '../../components/SearchBox';

const key = 'songs';

const Songs = ({ onLoad }) => {
  useInjectReducer({ key, reducer });
  useEffect(() => { onLoad(); }, [onLoad]);

  return (
    <SearchBox />
  );
};

const mapStateToProps = state => ({
  items: selectSongs(state),
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(loadSongs()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Songs);
