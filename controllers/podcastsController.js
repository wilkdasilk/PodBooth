var db = require('../models');
var controllers = require('../controllers');
var cloudinary = require('cloudinary');
var del = require('delete');

// GET /api/podcasts
function index(req, res) {
  db.Podcast.find({})
    .populate('_owner')
    .populate('latestBroadcast')
    .exec()
    .then(function(allPodcasts) {
       res.json(allPodcasts);
     }, function(err) {
       console.log('podcastsController.index error', err);
     });
}

function show(req, res) {
  console.log(req.params.podcastId);
  db.Podcast.findById(req.params.podcastId)
    .populate('_owner')
    .populate('latestBroadcast')
    .exec()
    .then(function(foundPodcast) {
      console.log(foundPodcast);
      res.json(foundPodcast);
    }, function(err) {
      console.log('podcastsController.show error', err);
    });
}

function create(req, res) {
  req.body.image = "";
  req.body._owner ="";
  req.body.subscribers = [];
  controllers.users.currentUser(req)
    .then(function(user) {
      req.body._owner = user._id;
    }, function(err) {
      console.log('usersController.show error', err);
    })
    .then(function(){
      if (req.file) {
        cloudinary.uploader.upload(req.file.path)
        .then(function(result, error){
          if (result.url) {
            req.body.image = result.url;
            del.sync([req.file.path]);
          } else {
            res.json(error);
          }
        })
        .then(function(){
          db.Podcast.create(req.body, function(err, podcast) {
          if (err) { console.log('error', err); }
          res.json(podcast);
          });
        });
     } else {
       db.Podcast.create(req.body, function(err, podcast) {
       if (err) { console.log('error', err); }
       res.json(podcast);
       });
     }
    })
}

function subscribe(req, res) {
  controllers.users.currentUser(req)
    .then(function(user) {
      db.Podcast.update({_id: req.params.podcastId, _owner: {$ne: user.id}}, { $addToSet: { subscribers: user.id }})
      .then(function(doc){
        if (doc.nModified >0){
          res.sendStatus(204);
        } else {
          res.status(401).send({error: "Cannot subscribe to your own podcast"});
        }
      }, function(err) {
        console.log('error updating podcast subscribers', err)
      });
    }, function(err) {
      console.log('usersController.subscribe error', err);
    });
}

function unsubscribe(req, res) {
  controllers.users.currentUser(req)
    .then(function(user) {
      db.Podcast.update({_id: req.params.podcastId}, { $pull: { subscribers: user.id }})
      .then(function(doc){
        res.sendStatus(204);
      }, function(err) {
        console.log('error removing podcast subscriber', err)
      });
    }, function(err) {
      console.log('usersController.unsubscribe error', err);
    });
}

// export public methods here
module.exports = {
  index: index,
  show: show,
  create: create,
  subscribe: subscribe,
  unsubscribe: unsubscribe
};
