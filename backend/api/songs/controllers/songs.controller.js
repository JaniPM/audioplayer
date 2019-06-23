'use strict';

const log = require('../../../core/log');
const songsService = require('../services/songs.service');

async function findAll (req, res) {
  let { limit, skip, search } = req.query;
  limit = parseInt(limit, 10) || 10;
  skip = parseInt(skip, 10) || 0;
  search = search || '';

  try {
    const response = await songsService.findAll(skip, limit, search);
    res.json(response);
  } catch (err) {
    log.error('songs.findAll caught error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function findOne (req, res) {
  const { id } = req.params;
  try {
    const song = await songsService.findById(id);
    if (!song) {
      return res.status(404).json({ error: `Song not found with id ${id}` });
    }
    res.json(song);
  } catch (err) {
    log.error('songs.findById caught error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function download (req, res) {
  const { id } = req.params;
  try {
    const file = await songsService.findFileById(id);
    if (!file) {
      return res.status(404).json({ error: `Song not found with id ${id}` });
    }
    res.download(file);
  } catch (err) {
    log.error('songs.download caught error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function stream (req, res) {
  const { id } = req.params;
  try {
    const stream = await songsService.findStreamById(id);
    if (!stream) {
      return res.status(404).json({ error: `Song not found with id ${id}` });
    }

    res.header({ 'Content-Type': 'audio/mpeg', 'Content-Length': stream.size });
    stream.readStream.pipe(res);
  } catch (err) {
    log.error('songs.stream caught error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  findOne,
  findAll,
  download,
  stream
};
