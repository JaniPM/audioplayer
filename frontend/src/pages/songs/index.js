import React, { memo, useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import useInjectReducer from '../../hooks/useInjectReducer';
import reducer from './state/reducer';
import * as selectors from './state/selectors';
import { loadSongs, searchSongs, loadSong } from './state/actions';
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
    paddingBottom: theme.spacing(3),
    height: '100%',
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const Songs = ({
  onLoadSongs,
  onLoadSong,
  onSearch,
  songs,
  selectedSong,
  hasMore,
  songsLoading,
  songLoading,
  searching,
}) => {
  const [searchTxt, setSearchTxt] = useState('');

  useInjectReducer({ key: moduleName, reducer });

  useEffect(() => {
    onLoadSongs();
  }, [onLoadSongs]);

  const handleSelectSong = song => onLoadSong(song.id);

  const handleLoadMore = () => onLoadSongs({
    search: searchTxt,
    skip: songs.length
  });

  const handleSearch = (txt) => {
    setSearchTxt(txt);
    onSearch(txt);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <header>
        <SearchBox
          value={searchTxt}
          onChange={handleSearch}
          searching={searching}
        />
        <Divider className={classes.divider} />
      </header>
      <div className={classes.content}>
        <div className={classes.listWrapper}>
          <SongList
            songs={songs}
            onSelectSong={handleSelectSong}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
            loading={songsLoading}
          />
        </div>
        <SongDetails song={selectedSong} loading={songLoading} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  songs: selectors.getSongs(state),
  selectedSong: selectors.getSelectedSong(state),
  hasMore: selectors.getHasMore(state),
  songsLoading: selectors.getSongsLoading(state),
  songLoading: selectors.getSongLoading(state),
  searching: selectors.getSearching(state),
});

const mapDispatchToProps = dispatch => ({
  onLoadSongs: params => dispatch(loadSongs(params)),
  onSearch: searchTxt => dispatch(searchSongs(searchTxt)),
  onLoadSong: id => dispatch(loadSong(id))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Songs);
