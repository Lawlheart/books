'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var TradesSchema = new mongoose.Schema({
  user: String,
  userId: String,
  book: {
  	title: String,
  	image: String,
  	author: String,
  	year: String,
    volumeId: String
  },
  notes: String,
  requests: Array,
  active: Boolean
});

export default mongoose.model('Trades', TradesSchema);

// user, book title, book image, book author, book year, notes, active