var db = require("./models");

var podcastList =[];
podcastList.push({
              name: 'The Tim Ferriss Show',
              description: `Tim Ferriss is a self-experimenter and bestselling author, best known for The 4-Hour Workweek, which has been translated into 40+ languages. Newsweek calls him "the world's best human guinea pig," and The New York Times calls him "a cross between Jack Welch and a Buddhist monk." In this show, he deconstructs world-class performers from eclectic areas (investing, chess, pro sports, etc.), digging deep to find the tools, tactics, and tricks that listeners can use.`,
              website: 'http://tim.blog',
              image: '/images/timferriss.jpg'
            });
podcastList.push({
              name: 'Philosophize This!',
              description: `Beginner friendly if listened to in order! For anyone interested in an educational podcast about philosophy where you don't need to be a graduate-level philosopher to understand it. In chronological order, the thinkers and ideas that forged the world we live in are broken down and explained.`,
              website: 'http://philosophizethis.org',
              image: '/images/philosophizethis.jpg'
            });
podcastList.push({
              name: 'Longform Podcast',
              description: `A weekly conversation with a non-fiction writer on how they tell stories.`,
              website: 'http://longform.org/podcast',
              image: '/images/longform.jpg'
            });
podcastList.push({
              name: 'StarTalk Radio',
              description: `Science, pop culture & comedy collide on StarTalk w/ astrophysicist & Hayden Planetarium director Neil deGrasse Tyson, comic co-hosts, celebrities & scientists.`,
              website: 'http://startalkradio.net',
              image: '/images/startalk.jpg'
            });

db.Podcast.remove({}, function(err, podcasts){

  db.Podcast.create(podcastList, function(err, podcasts){
    if (err) { return console.log('ERROR', err); }
    console.log("all podcasts:", podcasts);
    console.log("created", podcasts.length, "podcasts");
  });

});

process.exit();
