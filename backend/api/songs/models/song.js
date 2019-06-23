'use strict';

const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const config = require('../../../config/server');

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    virtuals: true,
    transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

Schema.virtual('src').get(function () {
  return `${config.host}:${config.port}/songs/${this._id}/stream`;
});

Schema.plugin(timestamps);

module.exports = mongoose.model('Song', Schema);
