var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var register = function (req, res) {
  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function(err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });
};

var login = function (req, res) {
  passport.authenticate('local', function(err, user, info) {
    var token;

    if (err) {
      res.status(404).json(err);
      return;
    }

    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // user isn't found
      res.status(401).json(info);
    }
  })(req, res);
};

module.exports = {
  register: register,
  login: login
}
