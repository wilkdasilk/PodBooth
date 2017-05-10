var db = require('../models');
var controllers = require('../controllers');
var cloudinary = require('cloudinary');
var del = require('delete');

// GET /api/podcasts
function index(req, res) {
  db.Podcast.find({}, function(err, allPodcasts) {
    res.json(allPodcasts);
  });
}

function show(req, res) {
  console.log(req.params.podcastId);
  db.Podcast.findById(req.params.podcastId)
    .populate('_owner').exec()
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


// export public methods here
module.exports = {
  index: index,
  show: show,
  create: create
};
