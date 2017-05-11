var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = require('./user');


var PodcastSchema = new Schema({
  name: String,
  description: String,
  website: String,
  image: String,
  _owner : {
    type: Schema.Types.ObjectId,
    ref: 'User' },
  subscribers: [{
    type: Schema.Types.ObjectId,
    ref: 'User' }]
});

var Podcast = mongoose.model('Podcast', PodcastSchema);

module.exports = Podcast;
