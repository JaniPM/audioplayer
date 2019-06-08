'use strict';

const host = process.env.MONGO_HOST || 'localhost';
const port = process.env.MONGO_PORT || 27017;
const dbName = process.env.MONGO_DB_NAME || 'audioplayer_db'; 

const config = {
  uri: `mongodb://${host}:${port}/${dbName}`,
  options: {
    useNewUrlParser: true,
    useFindAndModify: false
  }
};

module.exports = config;
