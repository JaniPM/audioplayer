'use strict';

const { createLogger, transports } = require('winston');

const log = createLogger({
  level: 'debug',
  transports: [new transports.Console()]
});

module.exports = log;
