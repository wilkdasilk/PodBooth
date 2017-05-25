var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BroadcastSchema = new Schema({
  podcast: {
    type: Schema.Types.ObjectId,
    ref: 'Podcast' },
  active: Boolean,
});

var Broadcast = mongoose.model('Broadcast', BroadcastSchema);

module.exports = Broadcast;
