import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import { MdSearch } from 'react-icons/md';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  root: {
    padding: '0.8em',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: 8,
    flex: 1,
    color: 'default',
  },
  icon: {
    color: 'default',
    height: '25px',
    width: '25px',
  },
});

const SearchBox = ({ value, onChange, searching }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      {searching
        ? <CircularProgress size={25} />
        : <MdSearch className={classes.icon} />
      }
      <InputBase
        className={classes.input}
        placeholder="Search..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </Paper>
  );
};

SearchBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  searching: PropTypes.bool,
};

SearchBox.defaultProps = {
  searching: false,
};

export default SearchBox;
