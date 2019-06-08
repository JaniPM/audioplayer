'use strict';

const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  }
});

Schema.plugin(timestamps);

module.exports = mongoose.model('Song', Schema);
