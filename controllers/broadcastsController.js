var db = require('../models');
var controllers = require('../controllers');

function create(req,res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: must be logged in"
    });
  }
  controllers.users.currentUser(req)
    .then(function(user) {
      //ensure request comes from owner
      db.Podcast.find({_id: req.params.podcastId, _owner: user._id})
        .then(function(podcast){
          db.Broadcast.create({podcast: req.body.podcastId, active: true})
            .then(function(broadcast){
              db.Podcast.findOneAndUpdate({_id: req.body.podcastId}, { latestBroadcast: broadcast._id })
                .then(function(){
                  res.json(broadcast);
                }, function(err){
                  console.log("Error updating podcast reference,", err);
                })
            }, function(err){
              console.log("Error creating broadcast,", err);
            })
        }, function(err){
          res.status(401).json({
            "message" : "UnauthorizedError: must be podcast owner to begin broadcast"
          });
        });
    });
}

function close(req,res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: must be logged in"
    });
  }
  controllers.users.currentUser(req)
    .then(function(user) {
      //ensure request comes from owner
      db.Podcast.find({_id: req.params.podcastId, _owner: user._id})
        .then(function(podcast){
          db.Broadcast.findOneAndUpdate({_id: req.params.id, active: false}, {new: true})
            .then(function(broadcast){
              res.json(broadcast);
            }, function(err){
              console.log("Error closing broadcast,", err);
            })
        }, function(err){
          res.status(401).json({
            "message" : "UnauthorizedError: must be podcast owner to close broadcast"
          });
        });
    });
}


// export public methods here
module.exports = {
  create: create,
  close: close
};
