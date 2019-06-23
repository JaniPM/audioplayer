'use strict';

const fileStorage = require('../../../core/file.storage');
const Song = require('../models/song');

async function findAll (skip, limit) {
  const songsPromise = Song.find({}).select('title artist').skip(skip).limit(limit);
  const totalPromise = Song.countDocuments({});

  const response = {};
  response.list = await songsPromise;
  response.total = await totalPromise;
  return response;
}

async function findById (id) {
  return Song.findById(id);
}

async function findFileById (id) {
  const song = await Song.findById(id);
  if (!song) {
    return null;
  }

  const canAccess = await fileStorage.canAccessFile(song.fileName);
  if (!canAccess) {
    return null;
  }

  return fileStorage.getFilePath(song.fileName);
}

async function findStreamById (id) {
  const song = await Song.findById(id);
  if (!song) {
    return null;
  }

  const canAccess = await fileStorage.canAccessFile(song.fileName);
  if (!canAccess) {
    return null;
  }

  const size = await fileStorage.getFileSize(song.fileName);
  const readStream = fileStorage.getReadStream(song.fileName);

  return { size: size, readStream: readStream };
}

module.exports = {
  findAll,
  findById,
  findFileById,
  findStreamById
};
