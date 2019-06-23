import React, { memo, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import useInjectReducer from '../../hooks/useInjectReducer';
import reducer from './state/reducer';
import { getSongs, getSelectedSong } from './state/selectors';
import { loadSongs, loadSong } from './state/actions';
import SearchBox from '../../components/SearchBox';
import SongList from './components/SongList';
import SongDetails from './components/SongDetails';

const moduleName = 'songs';

const useStyles = makeStyles({
  root: {
    marginTop: '1em',
  },
  content: {
    marginTop: '1em',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridRowGap: '1em',
    gridColumnGap: '1em',
  },
  divider: {
    marginTop: '1em',
    marginBottom: '1em',
  },
});

const Songs = ({
  onLoad,
  onLoadSong,
  songs,
  selectedSong,
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
        <SongList songs={songs} onSelectSong={handleSelectSong} />
        <SongDetails song={selectedSong} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  songs: getSongs(state),
  selectedSong: getSelectedSong(state),
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(loadSongs()),
  onLoadSong: id => dispatch(loadSong(id))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Songs);
