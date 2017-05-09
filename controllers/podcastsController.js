var db = require('../models');
var controllers = require('../controllers');

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
  req.body._owner ="";
  controllers.users.currentUser(req)
    .then(function(user) {
      req.body._owner = user._id;
      db.Podcast.create(req.body, function(err, podcast) {
        if (err) { console.log('error', err); }
        console.log(req.body);
        res.json(podcast);
      });
    }, function(err) {
      console.log('usersController.show error', err);
    });

}


// export public methods here
module.exports = {
  index: index,
  show: show,
  create: create
};
