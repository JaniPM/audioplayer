'use strict';

const express = require('express');
const router = express.Router();

// Setup routes. Each modules sets up their own child routes.
router.use('/songs', require('./songs/routes'));

module.exports = router;
