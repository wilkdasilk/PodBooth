var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
mongoose.connect("mongodb://127.0.0.1:27017/podbooth_test");

var Podcast = require('./podcast');
var User = require('./user');

module.exports.Podcast = Podcast;
module.exports.User = User;
