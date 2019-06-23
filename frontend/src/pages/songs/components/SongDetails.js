import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
  content: {
    padding: '1em',
  },
  meta: {
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: '2em 0',
  },
  metaItem: {
    padding: '0',
    marginBlockStart: '0',
    marginBlockEnd: '0',
    '& dt': {
      textTransform: 'uppercase',
      color: 'grey',
    },
    '& dd': {
      marginInlineStart: '0',
    },
  },
});

/*
artist: "Thea Leuschke Sr."
createdAt: "2019-06-09T09:18:40.519Z"
fileName: "sample.mp3"
*/

const SongDetails = ({ song }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {!song ? <h2>Select a song to play</h2> : (
        <Paper className={classes.content}>
          <h2>{song.title}</h2>
          <div className={classes.meta}>
            <dl className={classes.metaItem}>
              <dt>Artist</dt>
              <dd>{song.artist}</dd>
            </dl>
            <dl className={classes.metaItem}>
              <dt>File name</dt>
              <dd>{song.fileName}</dd>
            </dl>
          </div>
          <audio controls>
            <source src={song.src} type="audio/mpeg" />
            <p>Your browser doesn&apost support HTML5 audio.</p>
          </audio>
        </Paper>
      )}
    </div>
  );
};

SongDetails.propTypes = {
  song: PropTypes.objectOf(PropTypes.any),
};

SongDetails.defaultProps = {
  song: null,
};

export default SongDetails;
