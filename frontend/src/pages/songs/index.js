import React, { memo, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import useInjectReducer from '../../hooks/useInjectReducer';
import reducer from './state/reducer';
import { getItems } from './state/selectors';
import { loadSongs } from './state/actions';
import SearchBox from '../../components/SearchBox';
import SongList from './components/SongList';

const moduleName = 'songs';

const useStyles = makeStyles({
  root: {
    marginTop: '1em',
  },
  content: {
    marginTop: '1em',
  },
});

const Songs = ({
  onLoad,
  items,
  history,
  match,
}) => {
  useInjectReducer({ key: moduleName, reducer });
  useEffect(() => { onLoad(); }, [onLoad]);

  const classes = useStyles();

  console.log(match.url);
  const handleSelectSong = (song) => {
    history.push(`${match.url}/${song.id}`);
  };

  return (
    <div className={classes.root}>
      <SearchBox />
      <div className={classes.content}>
        <SongList songs={items} onSelectSong={handleSelectSong} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  items: getItems(state),
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(loadSongs()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Songs);
