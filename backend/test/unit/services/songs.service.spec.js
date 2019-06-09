'use strict';
/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const faker = require('faker');
const fixtures = require('../../fixtures/songs');

describe('songs.service', () => {
  const songMock = {
    findById: sinon.stub()
  };

  const fileStorageMock = {
    canAccessFile: sinon.stub(),
    getFilePath: sinon.stub(),
    getFileSize: sinon.stub(),
    getReadStream: sinon.stub()
  };

  const songsService = proxyquire('../../../api/songs/services/songs.service', {
    '../models/song': songMock,
    '../../../core/file.storage': fileStorageMock
  });

  afterEach(function () {
    songMock.findById.reset();
    fileStorageMock.canAccessFile.reset();
    fileStorageMock.getFilePath.reset();
    fileStorageMock.getFileSize.reset();
    fileStorageMock.getReadStream.reset();
  });

  describe('findFileById', () => {
    it('returns file path', async () => {
      const song = fixtures[0];
      const filePath = faker.system.filePath();
      songMock.findById.resolves(song);
      fileStorageMock.canAccessFile.resolves(true);
      fileStorageMock.getFilePath.resolves(filePath);

      const file = await songsService.findFileById(song._id);
      expect(file).to.equal(filePath);
      expect(songMock.findById.called).to.be.true;
      expect(fileStorageMock.canAccessFile.called).to.be.true;
      expect(fileStorageMock.getFilePath.called).to.be.true;
    });

    it('returns null if song cannot be found', async () => {
      const song = fixtures[0];
      songMock.findById.resolves(null);

      const file = await songsService.findFileById(song._id);
      expect(file).to.be.null;
      expect(songMock.findById.called).to.be.true;
      expect(fileStorageMock.canAccessFile.called).to.be.false;
      expect(fileStorageMock.getFilePath.called).to.be.false;
    });

    it('returns null if file cannot be found', async () => {
      const song = fixtures[0];
      songMock.findById.resolves(song);
      fileStorageMock.canAccessFile.resolves(false);

      const file = await songsService.findFileById(song._id);
      expect(file).to.be.null;
      expect(songMock.findById.called).to.be.true;
      expect(fileStorageMock.canAccessFile.called).to.be.true;
      expect(fileStorageMock.getFilePath.called).to.be.false;
    });
  }); // End of findFileById

  describe('findStreamById', () => {
    it('returns stream with size', async () => {
      const song = fixtures[0];
      const size = faker.random.number();
      const readStream = {};
      songMock.findById.resolves(song);
      fileStorageMock.canAccessFile.resolves(true);
      fileStorageMock.getFileSize.resolves(size);
      fileStorageMock.getReadStream.resolves(readStream);

      const stream = await songsService.findStreamById(song._id);
      expect(stream.size).to.equal(size);
      expect(stream.readStream).to.not.be.null;
      expect(songMock.findById.called).to.be.true;
      expect(fileStorageMock.canAccessFile.called).to.be.true;
      expect(fileStorageMock.getFileSize.called).to.be.true;
      expect(fileStorageMock.getReadStream.called).to.be.true;
    });

    it('returns null if song cannot be found', async () => {
      const song = fixtures[0];
      songMock.findById.resolves(null);

      const stream = await songsService.findStreamById(song._id);
      expect(stream).to.be.null;
      expect(songMock.findById.called).to.be.true;
      expect(fileStorageMock.canAccessFile.called).to.be.false;
      expect(fileStorageMock.getFileSize.called).to.be.false;
      expect(fileStorageMock.getReadStream.called).to.be.false;
    });

    it('returns null if file cannot be found', async () => {
      const song = fixtures[0];
      songMock.findById.resolves(song);
      fileStorageMock.canAccessFile.resolves(false);

      const stream = await songsService.findStreamById(song._id);
      expect(stream).to.be.null;
      expect(songMock.findById.called).to.be.true;
      expect(fileStorageMock.canAccessFile.called).to.be.true;
      expect(fileStorageMock.getFileSize.called).to.be.false;
      expect(fileStorageMock.getReadStream.called).to.be.false;
    });
  });
});
