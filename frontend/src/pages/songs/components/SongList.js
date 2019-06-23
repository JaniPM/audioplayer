import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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
  onLoadMore
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.gridList}>
        {songs.map(song => (
          <Card key={song.id}>
            <CardContent>
              <Typography component="h5" variant="h5">
                {song.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {song.artist}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => onSelectSong(song)}
              >
                Select
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
      {hasMore
        && <Button color="primary" onClick={onLoadMore}>Load more</Button>
      }
    </div>
  );
};

SongList.propTypes = {
  onSelectSong: PropTypes.func.isRequired,
  songs: PropTypes.arrayOf(PropTypes.object),
  hasMore: PropTypes.bool,
  onLoadMore: PropTypes.func.isRequired,
};

SongList.defaultProps = {
  songs: [],
  hasMore: false,
};

export default SongList;
