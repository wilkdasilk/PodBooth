var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = require('./user');


var PodcastSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  _owner: {
    type: Schema.Types.ObjectId,
    ref: 'User' },
  subscribers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'}],
  latestBroadcast: {
    type: Schema.Types.ObjectId,
    ref: 'Broadcast'},
});

var Podcast = mongoose.model('Podcast', PodcastSchema);

module.exports = Podcast;
