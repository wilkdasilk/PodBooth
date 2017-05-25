var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = require('./user');


var CommentSchema = new Schema({
  body: String,
  created_at: Date,
  _owner : {
    type: Schema.Types.ObjectId,
    ref: 'User' },
  upvoters: [{
    type: Schema.Types.ObjectId,
    ref: 'User' }],
  broadcast: {
    type: Schema.Types.ObjectId,
    ref: 'Broadcast' },
});

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
