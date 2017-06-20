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
      return createUser({
        name: "Adam",
        email: "adam@example.com",
        avatar: "http://res.cloudinary.com/wilkdasilk/image/upload/v1496868473/vcicaq1hcrpyceugfwjz.jpg",
        password: "adam"
      });
    }).then(function(user){
      userList.push(user);
      preparePodcasts();
      seedPodcasts();
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
  podcastList.push({
                name: 'Sworn',
                description: `The SWORN podcast, presented by UP AND VANISHED, pulls back the curtain on the criminal justice system exposing the untold stories and hard truths behind major cases, wrongful convictions, controversial legislation, and more. Host PHILIP HOLLOWAY, a defense attorney and former prosecutor with a background in law enforcement, not only digs into the legal aspects of these cases but the emotional consequences of their outcomes.`,
                website: 'https://www.swornpodcast.com/',
                image: 'http://res.cloudinary.com/wilkdasilk/image/upload/v1497988584/clggtxout3wmw78d3g6v.jpg',
                _owner: userList[0]
              });
  podcastList.push({
                name: 'Revisionist History',
                description: `Welcome to Revisionist History, a new podcast from Malcolm Gladwell and Panoply Media. Each week, over the course of 10 weeks, Revisionist History will go back and reinterpret something from the past. An event. A person. An idea. Something overlooked. Something misunderstood. Because sometimes the past deserves a second chance.`,
                website: 'http://revisionisthistory.com/',
                image: 'http://res.cloudinary.com/wilkdasilk/image/upload/v1497988884/h8q6zeqca996gjpgmn4f.jpg',
                _owner: userList[1]
              });
  podcastList.push({
                name: 'Invisibilia',
                description: `Invisibilia (Latin for invisible things) is about the invisible forces that control human behavior – ideas, beliefs, assumptions and emotions. Co-hosted by Lulu Miller, Hanna Rosin and Alix Spiegel, Invisibilia interweaves narrative storytelling with scientific research that will ultimately make you see your own life differently.`,
                website: 'http://www.npr.org/podcasts/510307/invisibilia',
                image: 'http://res.cloudinary.com/wilkdasilk/image/upload/v1497989179/rbqhbd6sp7b32cdlpgzf.jpg',
                _owner: userList[0]
              });
  podcastList.push({
                name: 'S-Town',
                description: `John despises his Alabama town and decides to do something about it. He asks a reporter to investigate the son of a wealthy family who’s allegedly been bragging that he got away with murder. But then someone else ends up dead, sparking a nasty feud, a hunt for hidden treasure, and an unearthing of the mysteries of one man’s life.`,
                website: 'https://stownpodcast.org/',
                image: 'http://res.cloudinary.com/wilkdasilk/image/upload/v1497989755/zh2qlhr7pg93eb7st6dq.jpg',
                _owner: userList[1]
              });
  podcastList.push({
                name: 'TED Radio Hour',
                description: `The TED Radio Hour is a journey through fascinating ideas: astonishing inventions, fresh approaches to old problems, new ways to think and create. Based on Talks given by riveting speakers on the world-renowned TED stage, each show is centered on a common theme – such as the source of happiness, crowd-sourcing innovation, power shifts, or inexplicable connections. The TED Radio Hour is hosted by Guy Raz, and is a co-production of NPR & TED. Follow the show @TEDRadioHour.`,
                website: 'http://www.npr.org/podcasts/510298/ted-radio-hour',
                image: 'http://res.cloudinary.com/wilkdasilk/image/upload/v1497989929/zz9e1r6kcvzlrg1uhaec.jpg',
                _owner: userList[0]
              });
  podcastList.push({
                name: 'This American Life',
                description: `This American Life is a weekly public radio show, heard by 2. 2 million people on more than 500 stations. Another 1. 5 million people download the weekly podcast. It is hosted by Ira Glass, produced by Chicago Public Media, delivered to stations by PRX The Public Radio Exchange, and has won all of the major broadcasting awards.`,
                website: 'https://www.thisamericanlife.org/podcast',
                image: 'http://res.cloudinary.com/wilkdasilk/image/upload/v1497990153/f9ombnqucggesjcte3la.png',
                _owner: userList[1]
              });
  podcastList.push({
                name: 'Up First',
                description: `NPR's Up First is the news you need to start your day. The biggest stories and ideas — from politics to pop culture — in 10 minutes. Hosted by Rachel Martin, David Greene and Steve Inskeep, with reporting and analysis from NPR News. Available weekdays by 6 a.m. ET. Subscribe and listen, then support your local NPR station at donate.npr.org.`,
                website: 'http://www.npr.org/podcasts/510318/up-first',
                image: 'http://res.cloudinary.com/wilkdasilk/image/upload/v1497990333/dmkeqmeyyozgcttevbej.jpg',
                _owner: userList[0]
              });
  podcastList.push({
                name: 'Up and Vanished',
                description: `An investigative podcast about the unsolved disappearance of Tara Grinstead hosted by Payne Lindsey.`,
                website: 'http://www.upandvanished.com/',
                image: 'http://res.cloudinary.com/wilkdasilk/image/upload/v1497990506/zi2hdcntpgapkss28qw3.jpg',
                _owner: userList[1]
              });
  podcastList.push({
                name: 'The Joe Rogan Experience',
                description: `The Joe Rogan Experience podcast is a long form conversation hosted by comedian, UFC color commentator, and actor Joe Rogan with friends and guests that have included comedians, actors, musicians, MMA instructors and commentators, authors, artists, and porn stars. The Joe Rogan Experience was voted the Best Comedy Podcast of 2012 on iTunes. In addition online listening, fans can watch a videocast of the show live on Ustream or tune in on Sirius XM’s “The Virus” channel on Saturdays at Noon ET and Sundays at 5:00 AM and 6:00 PM ET.`,
                website: 'http://podcasts.joerogan.net/',
                image: 'http://res.cloudinary.com/wilkdasilk/image/upload/v1497991082/fkoqactt0m6juku3n6b2.jpg',
                _owner: userList[0]
              });
  podcastList.push({
                name: 'Serial',
                description: `Serial is a podcast from the creators of This American Life, hosted by Sarah Koenig. Serial tells one story—a true story—over the course of a season. Each season, we follow a plot and characters wherever they take us. We won’t know what happens at the end until we get there, not long before you get there with us. Each week we bring you the next chapter in the story, so it's important to listen to the episodes in order.`,
                website: 'https://serialpodcast.org/',
                image: 'http://res.cloudinary.com/wilkdasilk/image/upload/v1497991690/bbtgrfmb0qpuekuc7ggn.jpg',
                _owner: userList[1]
              });
  podcastList.push({
                name: 'Pod Save America',
                description: `Four former aides to President Obama — Jon Favreau, Dan Pfeiffer, Jon Lovett, and Tommy Vietor — are joined by journalists, politicians, comedians, and activists for a freewheeling conversation about politics, the press and the challenges posed by the Trump presidency.`,
                website: 'https://getcrookedmedia.com/here-have-a-podcast-78ee56b5a323',
                image: 'http://res.cloudinary.com/wilkdasilk/image/upload/v1497992596/p1rpur4tanvmuhywyyiy.png',
                _owner: userList[0]
              });
  podcastList.push({
                name: 'Freakonomics Radio',
                description: `From the co-author of the best-selling Freakonomics titles comes Freakonomics Radio a fascinating and often surprising look at the hidden side of well, everything. Each week Stephen J Dubner explores the riddles of everyday life—from cheating and crime to parenting and reaches conclusions that turn conventional wisdom on its head.`,
                website: 'http://freakonomics.com/archive/',
                image: 'http://res.cloudinary.com/wilkdasilk/image/upload/v1497992960/uos9h4uojvvvfurwaaex.jpg',
                _owner: userList[1]
              });
  podcastList.push({
                name: "Dan Carlin's Hardcore History",
                description: `In Hardcore History the very unconventional Dan Carlin takes his martian outside-the-box way of thinking and applies it to the past. Was Alexander the Great as bad a person as Adolf Hitler? What would Apaches with modern weapons be like? Will our modern civilization ever fall like civilizations from past eras? This is a difficult-to-classify show that has a rather sharp edge it's not for everyone but the innovative style and approach has made Dan Carlin's hardcore history a new media hit`,
                website: 'http://www.dancarlin.com/hardcore-history-series/',
                image: 'http://res.cloudinary.com/wilkdasilk/image/upload/v1497993573/ypxmbkkb9ljczih975ex.jpg',
                _owner: userList[0]
              });
  podcastList.push({
                name: 'Lore',
                description: `Lore is a bi-weekly podcast about the history behind scary stories. The people, places, and things of our darkest nightmares all have real facts at their core. Each episode of Lore looks into a uniquely scary tale and uncovers the truth of what's behind it. Sometimes the truth is more frightening than fiction.`,
                website: 'http://www.lorepodcast.com/',
                image: 'http://res.cloudinary.com/wilkdasilk/image/upload/v1497993881/wwruj67uubpmgjmirr0z.jpg',
                _owner: userList[1]
              });
  podcastList.push({
                name: 'Hidden Brain',
                description: `The Hidden Brain helps curious people understand the world – and themselves. Using science and storytelling, Hidden Brain's host Shankar Vedantam reveals the unconscious patterns that drive human behavior, the biases that shape our choices, and the triggers that direct the course of our relationships.`,
                website: 'http://www.npr.org/podcasts/510308/hidden-brain',
                image: 'http://res.cloudinary.com/wilkdasilk/image/upload/v1497994627/rgltvvmpsjdfyvqpdo1t.jpg',
                _owner: userList[0]
              });
  podcastList.push({
                name: 'Fresh Air',
                description: `Fresh Air from WHYY, the Peabody Award-winning weekday magazine of contemporary arts and issues, is one of public radio's most popular programs. Hosted by Terry Gross, the show features intimate conversations with today's biggest luminaries.`,
                website: 'http://www.npr.org/podcasts/381444908/fresh-air',
                image: 'http://res.cloudinary.com/wilkdasilk/image/upload/v1497994917/gxf0tbmf1hgoungqmvf0.png',
                _owner: userList[1]
              });
  podcastList.push({
                name: 'How I Built This',
                description: `How I Built This is a podcast about innovators, entrepreneurs, and idealists, and the stories behind the movements they built. Each episode is a narrative journey marked by triumphs, failures, serendipity and insight — told by the founders of some of the world's best known companies and brands. If you've ever built something from nothing, something you really care about — or even just dream about it — check out How I Built This hosted by Guy Raz @guyraz. Follow the show @HowIBuiltThis.`,
                website: 'http://www.npr.org/podcasts/510313/how-i-built-this',
                image: 'http://res.cloudinary.com/wilkdasilk/image/upload/v1497995210/ey2cjuphdfzyur2eea6u.jpg',
                _owner: userList[0]
              });
  podcastList.push({
                name: 'My Favorite Murder with Karen Kilgariff and Georgia Hardstark',
                description: `Ready yourself for a murder adventure hosted by Karen Kilgariff and Georgia Hardstark, two lifelong fans of true crime stories. Each episode the girls tell each other their favorite tales of murder, and hear hometown crime stories from friends and fans. Check your anxiety at the door, 'cause Karen & Georgia are dying to discuss death.`,
                website: 'http://www.feralaudio.com/show/my-favorite-murder/',
                image: 'http://res.cloudinary.com/wilkdasilk/image/upload/v1497995436/lnrj7bix3wbdmaxf3nsl.jpg',
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
