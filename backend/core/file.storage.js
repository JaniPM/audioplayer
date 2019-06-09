'use stict';

const fs = require('fs');
const path = require('path');

function getFilePath (fileName) {
  return path.join(__dirname, '..', 'assets/' + fileName);
}

function getFileSize (fileName) {
  const filePath = getFilePath(fileName);
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) return reject(err);
      resolve(stats.size);
    });
  });
}

function getReadStream (fileName) {
  const filePath = getFilePath(fileName);
  return fs.createReadStream(filePath);
}

module.exports = {
  getFilePath,
  getFileSize,
  getReadStream
};
