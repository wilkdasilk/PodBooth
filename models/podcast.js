var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PodcastSchema = new Schema({
  name: String,
  description: String,
  website: String,
  image: String //,
  //owner: User.schema
  //subscribers: [User.schema]
});

var Podcast = mongoose.model('Podcast', PodcastSchema);

module.exports = Podcast;
