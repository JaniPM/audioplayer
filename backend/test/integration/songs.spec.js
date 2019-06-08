'use strict';

let request = require('supertest');
const faker = require('faker');
const { expect } = require('chai');
const app = require('../../app');
const db = require('../../core/db');
const Song = require('../../api/songs/models/song');

const seedCount = 5;

before(async () => {
  console.log('Setup tests');
  await db.connect();

  // Seed test data
  for (let i = 0; i < seedCount; i++) {
    await Song.create({
      name: 'Song ' + i,
      artist: faker.name.findName()
    });
  }

  request = request(app);
});

describe('songs', () => {
  it('responses with paginated data', (done) => {
    request.get('/songs')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body.list.length).to.equal(seedCount);
        expect(res.body.total).to.equal(seedCount);

        done();
      });
  });

  it('skips and limits', (done) => {
    request.get('/songs?skip=4&limit=1')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body.list.length).to.equal(1);
        expect(res.body.total).to.equal(seedCount);

        done();
      });
  });
});

after(async () => {
  // Clean up seed data
  await Song.deleteMany({});
});
