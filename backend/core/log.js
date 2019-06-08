'use strict';

const { createLogger, transports } = require('winston');

const log = createLogger({
  transports: [new transports.Console()]
});

module.exports = log;
