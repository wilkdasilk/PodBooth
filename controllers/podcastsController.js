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
      console.log('podcastsController.create error', err);
      req.status(401).json({"message" : "UnauthorizedError: Must be logged in to create Podcast"});
    })
    .then(function(){
      if (req.file) {
        cloudinary.uploader.upload(req.file.path)
        .then(function(result, error){
          if (result.url) {
            req.body.image = result.url;
            del.sync([req.file.path]);
          } else {
            console.log(error);
          }
        })
        .then(function(){
          db.Podcast.create(req.body, function(err, podcast) {
          if (err) {
             console.log('error', err);
             res.status(406).json(err);
           } else {
             res.json(podcast);
           }
          });
        });
     } else {
       db.Podcast.create(req.body, function(err, podcast) {
       if (err) {
         console.log('error', err);
         res.status(406).json(err);
       } else {
         res.json(podcast);
       }
       });
     }
    })
}

function update(req, res) {
  controllers.users.currentUser(req)
    .then(function(user) {
      if (req.file) {
        cloudinary.uploader.upload(req.file.path)
        .then(function(result, error){
          if (result.url) {
            req.body.image = result.url;
            del.sync([req.file.path]);
          } else {
            console.log(error);
          }
        }).then(function(){
          db.Podcast.update({_id: req.params.podcastId, _owner: user.id}, req.body)
          .then(function(doc){
            if (doc.nModified >0){
              res.sendStatus(204);
            } else {
              res.status(401).send({"message" : "UnauthorizedError: Must be owner to update Podcast"});
            }
          }, function(err) {
            console.log('error updating podcast', err)
          });
        }, function(err) {
          console.log('error uploading image', err);
        });
      } else {
        db.Podcast.update({_id: req.params.podcastId, _owner: user.id}, req.body)
        .then(function(doc){
          if (doc.nModified >0){
            res.sendStatus(204);
          } else {
            res.status(401).send({"message" : "UnauthorizedError: Must be owner to update Podcast"});
          }
        }, function(err) {
          console.log('err updating podcast', err);
        });
      }, function(err) {
        console.log('err retreiving current user', err);
      });
}

function destroy(req, res) {
  controllers.users.currentUser(req)
    .then(function(user) {
      db.Podcast.findOneAndRemove({_id: req.params.podcastId, _owner: user.id})
      .then(function(doc){
        if (!!doc){
          res.sendStatus(204);
        } else {
          res.status(401).send({"message" : "UnauthorizedError: Must be owner to delete Podcast"});
        }
      }, function(err) {
        console.log('error deleting podcast ', err)
      });
    }, function(err) {
      console.log('podcastsController.destroy error', err);
    });
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
      console.log('podcastsController.subscribe error', err);
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
      console.log('podcastsController.unsubscribe error', err);
    });
}

// export public methods here
module.exports = {
  index: index,
  show: show,
  create: create,
  update: update,
  destroy: destroy,
  subscribe: subscribe,
  unsubscribe: unsubscribe
};
