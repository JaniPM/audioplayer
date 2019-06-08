'use strict';

const log = require('../../../core/log');
const Song = require('../models/song');

async function findAll (req, res) {
  let { limit, skip } = req.query;
  limit = parseInt(limit, 10) || 10;
  skip = parseInt(skip, 10) || 0;

  try {
    const songsPromise = Song.find({}).skip(skip).limit(limit);
    const totalPromise = Song.countDocuments({});

    const response = {};
    response.list = await songsPromise;
    response.total = await totalPromise;

    res.json(response);
  } catch (err) {
    log.error('songs.findAll caught error', err);
    res.status(500);
  }
}

module.exports = {
  findAll
};
