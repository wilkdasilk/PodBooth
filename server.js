var dotenv = require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport');
var controllers = require('./controllers');
var jwt = require('express-jwt');
var auth = jwt({secret: process.env.POD_SECRET, userProperty: 'payload'});
var multer = require('multer');
var upload = multer({dest: './uploads'});

require('./config/passport');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/vendor', express.static(__dirname + '/bower_components'));
app.use(passport.initialize());
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/templates/:name', function templates (req, res) {
  var name = req.params.name;
  res.sendFile(__dirname + `/views/templates/${name}.html`);
});

/*
 * JSON API Endpoints
 */

app.get('/api', controllers.api.index);
app.post('/api/register', controllers.authentication.register);
app.post('/api/login', controllers.authentication.login);
app.get('/api/profile', auth, controllers.users.profile);
app.get('/api/podcasts', controllers.podcasts.index);
app.get('/api/podcasts/:podcastId', controllers.podcasts.show);
app.post('/api/podcasts', auth, upload.single('image'), controllers.podcasts.create);

// All others go to index
app.get('*', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
