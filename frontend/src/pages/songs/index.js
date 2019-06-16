import React, { memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import useInjectReducer from '../../hooks/useInjectReducer';
import reducer from './state/reducer';
import { selectSongs } from './state/selectors';

const key = 'songs';

const Songs = () => {
  useInjectReducer({ key, reducer });
  return (
    <h1>Songs page</h1>
  );
};

const mapStateToProps = state => ({
  items: selectSongs(state),
});

const mapDispatchToProps = dispatch => ({
  // someHandler: () => dispatch(someAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Songs);
