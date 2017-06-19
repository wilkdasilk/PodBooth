var db = require('./models');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var podcastList =[];
var userList = [];

db.User.remove({}, function(err){
  if (err){
    console.log("error removing users", err);
  } else {
    console.log("successfully removed users");
    createUser({
      name: "Julian",
      email: "julian@example.com",
      avatar: "http://res.cloudinary.com/wilkdasilk/image/upload/v1496876584/mqsqii2lvice5gf5xfrq.jpg",
      password: "julian"
    }).then(function(user){
      userList.push(user);
      createUser({
        name: "Adam",
        email: "adam@example.com",
        avatar: "http://res.cloudinary.com/wilkdasilk/image/upload/v1496868473/vcicaq1hcrpyceugfwjz.jpg",
        password: "adam"
      }).then(function(user){
        userList.push(user);
        preparePodcasts();
        seedPodcasts();
      });
    });
  }
});
db.Broadcast.remove({},function(err){
  if (err){
    console.log("error removing broadcasts", err);
  } else {
    console.log("successfully removed broadcasts");
  }
});
db.Comment.remove({},function(err){
  if (err){
    console.log("error removing comments", err);
  } else {
    console.log("successfully removed comments");
  }
});

function preparePodcasts(){
  console.log('preparing podcasts');
  podcastList.push({
                name: 'The Tim Ferriss Show',
                description: `Tim Ferriss is a self-experimenter and bestselling author, best known for The 4-Hour Workweek, which has been translated into 40+ languages. Newsweek calls him "the world's best human guinea pig," and The New York Times calls him "a cross between Jack Welch and a Buddhist monk." In this show, he deconstructs world-class performers from eclectic areas (investing, chess, pro sports, etc.), digging deep to find the tools, tactics, and tricks that listeners can use.`,
                website: 'http://tim.blog',
                image: 'http://res.cloudinary.com/wilkdasilk/image/upload/v1497910980/omqdk0wwsljnupm0yd6l.jpg',
                _owner: userList[0]
              });
  podcastList.push({
                name: 'Philosophize This!',
                description: `Beginner friendly if listened to in order! For anyone interested in an educational podcast about philosophy where you don't need to be a graduate-level philosopher to understand it. In chronological order, the thinkers and ideas that forged the world we live in are broken down and explained.`,
                website: 'http://philosophizethis.org',
                image: 'http://res.cloudinary.com/wilkdasilk/image/upload/v1497911753/xpyq7ksrpjtixkhzsh3a.jpg',
                _owner: userList[0]
              });
  podcastList.push({
                name: 'Longform Podcast',
                description: `A weekly conversation with a non-fiction writer on how they tell stories.`,
                website: 'http://longform.org/podcast',
                image: 'http://res.cloudinary.com/wilkdasilk/image/upload/v1494385267/fxu5ddebadbl5yxejjl6.jpg',
                _owner: userList[1]
              });
  podcastList.push({
                name: 'StarTalk Radio',
                description: `Science, pop culture & comedy collide on StarTalk w/ astrophysicist & Hayden Planetarium director Neil deGrasse Tyson, comic co-hosts, celebrities & scientists.`,
                website: 'http://startalkradio.net',
                image: 'http://res.cloudinary.com/wilkdasilk/image/upload/v1497912496/iv7ivmfunmydkj7nipl3.jpg',
                _owner: userList[1]
              });
}

function createUser(seedUser) {
  var user = new User();

  user.name = seedUser.name;
  user.email = seedUser.email;
  user.avatar = seedUser.avatar;
  user.setPassword(seedUser.password);
  return user.save();
}

function seedPodcasts() {
  db.Podcast.remove({}, function(err, podcasts){
    if (err) {
      console.log("err removing podcasts", err);
    } else {
      console.log("successfully removed podcasts");
    }
    db.Podcast.create(podcastList, function(err, podcasts){
      if (err) { return console.log('ERROR', err); }
      console.log("all podcasts:", podcasts);
      console.log("created", podcasts.length, "podcasts");
    });

  });
}
