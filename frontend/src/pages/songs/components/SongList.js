import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import SongCard from './SongCard';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
  },
  gridList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridRowGap: theme.spacing(1),
    gridColumnGap: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }
}));

const SongList = ({
  songs,
  onSelectSong,
  hasMore,
  loading,
  onLoadMore
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {songs.length === 0 && <p>No songs found!</p>}
      <div className={classes.gridList}>
        {songs.map(song => (
          <SongCard
            key={song.id}
            {...song}
            onSelect={() => onSelectSong(song)}
          />
        ))}
      </div>
      {loading && <CircularProgress size={25} /> }
      {!loading && hasMore
        && <Button color="primary" onClick={onLoadMore}>Load more</Button>
      }
    </div>
  );
};

SongList.propTypes = {
  onSelectSong: PropTypes.func.isRequired,
  songs: PropTypes.arrayOf(PropTypes.object),
  hasMore: PropTypes.bool,
  loading: PropTypes.bool,
  onLoadMore: PropTypes.func.isRequired,
};

SongList.defaultProps = {
  songs: [],
  hasMore: false,
  loading: false,
};

export default SongList;
