var db = require('../config');
var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var linkSchema = new Schema({
  url: String,
  code: String,
  title: String,
  visits: Number,
  baseUrl: String
});

var createShortUrl = function(url) {
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0, 5);
};

linkSchema.pre('save', function(next) {
  console.log('link save');

  var code = createShortUrl(this.url);
  this.code = code; // => save the code
  next();
});

var Link = mongoose.model('Link', linkSchema);

module.exports = Link;
