var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = require('./user');


var CommentSchema = new Schema({
  body: String,
  _owner : {
    type: Schema.Types.ObjectId,
    ref: 'User' },
  upvoters: [{
    type: Schema.Types.ObjectId,
    ref: 'User' }]
});

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
