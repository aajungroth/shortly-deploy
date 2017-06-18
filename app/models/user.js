var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true}
});

var User = mongoose.model('User', userSchema);


User.comparePassword = function(possibleMatch, savedPassword, callback) {
  bcrypt.compare(possibleMatch, savedPassword, function(err, match) {
    if (err) {
      return callback(match, null);
    }
    callback(null, match);
  });
};

userSchema.pre('save', function(next) {
  // here is where the promises come out
  console.log('user save');
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
});

module.exports = User;
