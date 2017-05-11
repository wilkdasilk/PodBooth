var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var cloudinary = require('cloudinary');
var del = require('delete');

var register = function (req, res) {
  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;
  user.avatar = "";

  user.setPassword(req.body.password);

  if (req.file) {
    cloudinary.uploader.upload(req.file.path)
    .then(function(result, error){
      if (result.url) {
        user.avatar = result.url;
        console.log(result.url);
        del.sync([req.file.path]);
      } else {
        res.json(error);
      }
    })
    .then(function(){
      user.save(function(err) {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
          "token" : token
        });
      });
    });
   } else {
     user.save(function(err) {
       var token;
       token = user.generateJwt();
       res.status(200);
       res.json({
         "token" : token
       });
     });
   }
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
