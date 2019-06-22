import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import { MdSearch } from 'react-icons/md';

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

const SearchBox = ({ value, onChange }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <MdSearch className={classes.icon} />
      <InputBase
        className={classes.input}
        placeholder="Search..."
        value={value}
        onChange={onChange}
      />
    </Paper>
  );
};

export default SearchBox;
