'use strict';

const { ObjectId } = require('mongodb');
const faker = require('faker');

const songs = [
  {
    _id: new ObjectId(),
    title: 'Song 1',
    fileName: 'sample.mp3',
    artist: faker.name.findName()
  }
];

module.exports = songs;
