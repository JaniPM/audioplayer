'use strict';

const log = require('../../../core/log');
const fileStorage = require('../../../core/file.storage');
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

function download (req, res) {
  try {
    // TODO currently always offers sample.mp3
    // Read from file metadata when POST route is ready
    const file = fileStorage.getFilePath('sample.mp3');
    res.download(file);
  } catch (err) {
    log.error('songs.download caught error', err);
    res.status(500);
  }
}

async function stream (req, res) {
  try {
    // TODO currently always offers sample.mp3
    // Read from file metadata when POST route is ready
    const fileName = 'sample.mp3';
    const size = await fileStorage.getFileSize(fileName);

    res.header({
      'Content-Type': 'audio/mpeg',
      'Content-Length': size
    });

    const readStream = fileStorage.getReadStream(fileName);
    readStream.pipe(res);
  } catch (err) {
    log.error('songs.download caught error', err);
    res.status(500);
  }
}

module.exports = {
  findAll,
  download,
  stream
};
