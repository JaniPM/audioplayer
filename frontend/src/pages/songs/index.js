import React, { memo, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import useInjectReducer from '../../hooks/useInjectReducer';
import reducer from './state/reducer';
import { getSongs, getSelectedSong, getHasMore } from './state/selectors';
import { loadSongs, loadSong } from './state/actions';
import SearchBox from '../../components/SearchBox';
import SongList from './components/SongList';
import SongDetails from './components/SongDetails';

const moduleName = 'songs';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
  content: {
    marginTop: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridRowGap: theme.spacing(2),
    gridColumnGap: theme.spacing(2),
    height: '80vh',
  },
  listWrapper: {
    overflowY: 'auto',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    height: '100%',
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const Songs = ({
  onLoad,
  onLoadSong,
  songs,
  selectedSong,
  hasMore,
}) => {
  useInjectReducer({ key: moduleName, reducer });
  useEffect(() => { onLoad(); }, [onLoad]);

  const handleSelectSong = song => onLoadSong(song.id);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <header>
        <SearchBox />
        <Divider className={classes.divider} />
      </header>
      <div className={classes.content}>
        <div className={classes.listWrapper}>
          <SongList
            songs={songs}
            onSelectSong={handleSelectSong}
            hasMore={hasMore}
          />
        </div>
        <SongDetails song={selectedSong} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  songs: getSongs(state),
  selectedSong: getSelectedSong(state),
  hasMore: getHasMore(state)
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(loadSongs()),
  onLoadSong: id => dispatch(loadSong(id))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Songs);
