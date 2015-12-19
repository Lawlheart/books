'use strict';

var app = require('../..');
import request from 'supertest';

var newContact;

describe('Contact API:', function() {

  describe('GET /api/contact', function() {
    var contacts;

    beforeEach(function(done) {
      request(app)
        .get('/api/contact')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          contacts = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(contacts).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/contact', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/contact')
        .send({
          name: 'New Contact',
          info: 'This is the brand new contact!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newContact = res.body;
          done();
        });
    });

    it('should respond with the newly created contact', function() {
      expect(newContact.name).to.equal('New Contact');
      expect(newContact.info).to.equal('This is the brand new contact!!!');
    });

  });

  describe('GET /api/contact/:id', function() {
    var contact;

    beforeEach(function(done) {
      request(app)
        .get('/api/contact/' + newContact._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          contact = res.body;
          done();
        });
    });

    afterEach(function() {
      contact = {};
    });

    it('should respond with the requested contact', function() {
      expect(contact.name).to.equal('New Contact');
      expect(contact.info).to.equal('This is the brand new contact!!!');
    });

  });

  describe('PUT /api/contact/:id', function() {
    var updatedContact;

    beforeEach(function(done) {
      request(app)
        .put('/api/contact/' + newContact._id)
        .send({
          name: 'Updated Contact',
          info: 'This is the updated contact!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedContact = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedContact = {};
    });

    it('should respond with the updated contact', function() {
      expect(updatedContact.name).to.equal('Updated Contact');
      expect(updatedContact.info).to.equal('This is the updated contact!!!');
    });

  });

  describe('DELETE /api/contact/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/contact/' + newContact._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when contact does not exist', function(done) {
      request(app)
        .delete('/api/contact/' + newContact._id)
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
