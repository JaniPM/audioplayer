import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Audio from '../../../components/Audio';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
  },
  content: {
    padding: theme.spacing(2),
  },
  meta: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
}));

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
          <Audio src={song.src} />
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
