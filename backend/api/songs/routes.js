'use strict';

const express = require('express');
const router = express.Router();
const {
  findAll,
  findOne,
  download,
  stream
} = require('./controllers/songs.controller');

router.get('/', findAll);
router.get('/:id', findOne);
router.get('/:id/download', download);
router.get('/:id/stream', stream);

module.exports = router;
