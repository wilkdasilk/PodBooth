var db = require('../models');

function profile (req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    currentUser(req)
    .then(function(user) {
      user.getOwnedPodcasts()
        .then(function(podcasts){
          user.ownedPodcasts = podcasts;
          res.status(200).json(user)
        }, function(err){
          console.log("Error finding owned podcasts", err);
        });
    }, function(err) {
      console.log('usersController.show error', err);
    });
  }

}

function currentUser (req) {
  if (!req.payload._id) {
    return null
  } else {
    var promise = db.User.findById(req.payload._id).exec();
    return promise;
  }
}

// export public methods here
module.exports = {
  profile: profile,
  currentUser : currentUser
};
