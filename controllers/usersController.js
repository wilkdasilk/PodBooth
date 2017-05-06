var db = require('../models');

function profile (req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    db.User
    .findById(req.payload._id)
    .exec(function(err, user) {
      if(err) { console.log('usersController.show error', err); }
      res.status(200).json(user);
    })
  }
  
}

// export public methods here
module.exports = {
  profile: profile
};
