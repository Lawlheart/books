'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ContactSchema = new mongoose.Schema({
  _id: String,
  username: String,
  fullName: String,
  city: String,
  state: String
});

export default mongoose.model('Contact', ContactSchema);
