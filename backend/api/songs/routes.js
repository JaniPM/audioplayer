'use strict';

const express = require('express');
const router = express.Router();
const { findAll } = require('./controllers/songs.controller');

router.get('/', findAll);

module.exports = router;
