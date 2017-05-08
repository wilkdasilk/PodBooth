var db = require('../models');

// GET /api/podcasts
function index(req, res) {
  db.Podcast.find({}, function(err, allPodcasts) {
    res.json(allPodcasts);
  });
}

function show(req, res) {
  db.Podcast.findById(req.params.podcastId, function(err, foundPodcast) {
    if(err) { console.log('podcastsController.show error', err); }
    res.json(foundPodcast);
  });
}

function create(req, res) {
  db.Podcast.create(req.body, function(err, podcast) {
    if (err) { console.log('error', err); }
    res.json(podcast);
  });
}


// export public methods here
module.exports = {
  index: index,
  show: show,
  create: create
};
