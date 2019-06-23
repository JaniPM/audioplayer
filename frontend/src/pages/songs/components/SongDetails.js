import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Audio from '../../../components/Audio';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
  },
  content: {
    padding: theme.spacing(2),
    height: '100%',
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

const SongDetails = ({ song, loading }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {loading && (
        <Paper className={classes.content}>
          <CircularProgress size={25} />
        </Paper>
      )}
      {!loading && !song && <h2>Select a song to play</h2>}
      {!loading && song && (
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
  loading: PropTypes.bool,
};

SongDetails.defaultProps = {
  song: null,
  loading: true,
};

export default SongDetails;
