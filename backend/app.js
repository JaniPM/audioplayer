'use strict';

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./api/routes');
const config = require('./config/server');
const db = require('./core/db');
const log = require('./core/log');

const app = express();

// Setup middleware
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Attach all api routes
app.use('/', routes);

db.connect().then(() => {
  app.listen(config.port, () => log.info(`Api listening on port ${config.port}!`));
});

module.exports = app;
