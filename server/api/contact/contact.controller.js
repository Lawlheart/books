/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/contact              ->  index
 * POST    /api/contact              ->  create
 * GET     /api/contact/:id          ->  show
 * PUT     /api/contact/:id          ->  update
 * DELETE  /api/contact/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Contact = require('./contact.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.extend(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Contacts
export function index(req, res) {
  Contact.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Contact from the DB
export function show(req, res) {
  Contact.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Contact in the DB
export function create(req, res) {
  Contact.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Contact in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Contact.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Contact from the DB
export function destroy(req, res) {
  Contact.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
