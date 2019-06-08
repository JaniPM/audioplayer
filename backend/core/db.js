'use strict';

const mongoose = require('mongoose');
const log = require('./log');
const config = require('../config/db');

function connect () {
  const connection = mongoose.connection;

  connection.on('error', (err) => {
    log.error('Mongoose error: ' + err);
    process.exit(1);
  });

  connection.on('connected', () => log.info(`Mongoose connected to uri: ${config.uri}`));

  connection.on('disconnected', () => log.info('Mongoose connection disconnected'));

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
    connection.close(() => {
      log.info('Mongoose connection disconnected through app termination');
      process.exit(0);
    });
  });

  return mongoose.connect(config.uri, config.options);
}

module.exports = {
  connect
};
