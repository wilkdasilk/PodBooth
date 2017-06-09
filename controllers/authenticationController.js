var controllers = require('../controllers');
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var cloudinary = require('cloudinary');
var del = require('delete');

var register = function (req, res) {
  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;
  user.avatar;

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
        if (err) {
          res.status(406).json(err);
        } else {
          var token;
          token = user.generateJwt();
          res.status(200).json({
            "token" : token
          });
        }
      });
    });
   } else {
      res.status(406).json({ "message" : "Error: User image is required"});
   }
};

var update = function (req, res) {
  controllers.users.currentUser(req)
    .then(function(user) {
      user.name = req.body.name;
      user.email = req.body.email;
      if (!user.validPassword(req.body.password)){
        return res.status(401).json({"message" : "UnauthorizedError: Incorrect current password"});
      }
      user.setPassword(req.body.newPassword);

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
        }).then(function(){
          user.save(function(err) {
            if (err) {
              res.status(406).json(err);
            } else {
              var token;
              token = user.generateJwt();
              res.status(200).json({
                "token" : token
              });
            }
          });
        });
       } else {
         user.save(function(err) {
           if (err) {
             res.status(406).json(err);
           } else {
             var token;
             token = user.generateJwt();
             res.status(200).json({
               "token" : token
             });
           }
         });
        }
      }, function(err) {
      console.log('authenticationController.update error', err);
      res.status(401).json({"message" : "UnauthorizedError: Can only update your own account when logged in"});
    });
}


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
  update: update,
  login: login
}
