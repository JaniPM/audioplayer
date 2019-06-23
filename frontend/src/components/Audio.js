/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';

const Audio = ({ src }) => (
  <audio controls>
    <source src={src} type="audio/mpeg" />
    <p>Your browser doesn&apost support HTML5 audio.</p>
  </audio>
);

Audio.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Audio;
