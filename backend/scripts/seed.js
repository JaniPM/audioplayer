'use strict';

const faker = require('faker');
const db = require('../core/db');
const Song = require('../api/songs/models/song');

async function seed (seedCount) {
  const connection = await db.connect();

  // Seed test data
  for (let i = 0; i < seedCount; i++) {
    await Song.create({
      title: faker.random.word(),
      fileName: 'sample.mp3',
      artist: faker.name.findName()
    });
  }

  await connection.disconnect();
}

seed(200);
