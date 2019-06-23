import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, auto)',
    gridRowGap: '1em',
    gridColumnGap: '1em',
  },
});

const SongList = ({ songs, onSelectSong }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
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
  );
};

SongList.propTypes = {
  onSelectSong: PropTypes.func.isRequired,
  songs: PropTypes.arrayOf(PropTypes.object),
};

SongList.defaultProps = {
  songs: []
};

export default SongList;
