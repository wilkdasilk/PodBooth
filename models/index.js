var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
mongoose.connect("mongodb://127.0.0.1:27017/podbooth_test");

var Podcast = require('./podcast');
var User = require('./user');
var Comment = require('./comment');
var Broadcast = require('./broadcast');

module.exports.Podcast = Podcast;
module.exports.User = User;
module.exports.Comment = Comment;
module.exports.Broadcast = Broadcast;
