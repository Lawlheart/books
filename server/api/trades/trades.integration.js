'use strict';

var app = require('../..');
import request from 'supertest';

var newTrades;

describe('Trades API:', function() {

  describe('GET /api/trades', function() {
    var trades;

    beforeEach(function(done) {
      request(app)
        .get('/api/trades')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          trades = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(trades).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/trades', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/trades')
        .send({
          name: 'New Trades',
          info: 'This is the brand new trades!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTrades = res.body;
          done();
        });
    });

    it('should respond with the newly created trades', function() {
      expect(newTrades.name).to.equal('New Trades');
      expect(newTrades.info).to.equal('This is the brand new trades!!!');
    });

  });

  describe('GET /api/trades/:id', function() {
    var trades;

    beforeEach(function(done) {
      request(app)
        .get('/api/trades/' + newTrades._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          trades = res.body;
          done();
        });
    });

    afterEach(function() {
      trades = {};
    });

    it('should respond with the requested trades', function() {
      expect(trades.name).to.equal('New Trades');
      expect(trades.info).to.equal('This is the brand new trades!!!');
    });

  });

  describe('PUT /api/trades/:id', function() {
    var updatedTrades;

    beforeEach(function(done) {
      request(app)
        .put('/api/trades/' + newTrades._id)
        .send({
          name: 'Updated Trades',
          info: 'This is the updated trades!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTrades = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTrades = {};
    });

    it('should respond with the updated trades', function() {
      expect(updatedTrades.name).to.equal('Updated Trades');
      expect(updatedTrades.info).to.equal('This is the updated trades!!!');
    });

  });

  describe('DELETE /api/trades/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/trades/' + newTrades._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when trades does not exist', function(done) {
      request(app)
        .delete('/api/trades/' + newTrades._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
