import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const SongCard = ({ title, artist, onSelect }) => (
  <Card>
    <CardContent>
      <Typography component="h5" variant="h5">
        {title}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        {artist}
      </Typography>
    </CardContent>
    <CardActions>
      <Button
        size="small"
        color="primary"
        onClick={onSelect}
      >
        Select
      </Button>
    </CardActions>
  </Card>
);

SongCard.propTypes = {
  onSelect: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
};

export default SongCard;
