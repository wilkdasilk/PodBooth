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
      db.Broadcast.findById(req.params.id)
        .populate({
          path: 'podcast',
          populate: { path: '_owner'}
        }).exec()
        .then(function(broadcast){
          if (broadcast.podcast._owner._id.toString() == user._id.toString()) {
            broadcast.active = false;
            broadcast.save(function(err, broadcast){
              if (err) {
                console.log("Error closing broadcast,", err);
                res.sendStatus(500);
              } else {
                res.json(broadcast);
              }
            });
          } else {
            res.sendStatus(401).json({
              "message" : "UnauthorizedError: must be podcast owner to close broadcast"
            });
          }
        }, function(err){
          console.log("error finding broadcast", err);
          res.sendStatus(404).json({
            "message" : "Bad Request: cannot find Broadcast by Id provided"
          });
        });
    });
}


// export public methods here
module.exports = {
  create: create,
  close: close
};
