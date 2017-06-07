var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var db  = require('../models');


var UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  ownedPodcasts : [{
    type: Schema.Types.ObjectId,
    ref: 'Podcast' }],
  subscribedPodcasts : [{
    type: Schema.Types.ObjectId,
    ref: 'Podcast' }],
  avatar: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJwt = function () {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000)
  }, process.env.POD_SECRET);
};

UserSchema.methods.getOwnedPodcasts = function() {
  return db.Podcast
  .find({ _owner: this._id })
  .populate('_owner').exec();
}

UserSchema.methods.getSubscribedPodcasts = function() {
  return db.Podcast
  .find({ subscribers: this._id })
  .populate('_owner').exec();
}

var User = mongoose.model('User', UserSchema);
module.exports = User;
