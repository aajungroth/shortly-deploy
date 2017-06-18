var db = require('../config');
var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var linkSchema = new Schema({
  url: String,
  code: Number,
  title: String,
  visits: Number,
  baseUrl: String
});

var Link = mongoose.model('Link', linkSchema);

var createShortUrl = function(url) {
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0, 5);
};

linkSchema.pre('save', function(next) {
  var code = createShortUrl(this.url);
  this.code = code; // => save the code
  // console.log('\n\n\n\n\n\n\n\nthis.code: ', this.code);
  // next(this.code);
  next();
});

module.exports = Link;
