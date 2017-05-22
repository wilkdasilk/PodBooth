var db = require('../models');
var controllers = require('../controllers');

//need to change once broadcasts exist
function index(req,res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: must be logged in"
    });
  }
  controllers.users.currentUser(req)
    .then(function(user) {
      //update to if user isn't subscribed or not live
      db.Podcast.find({_id: req.params.podcastId, subscribers: user._id})
        .then(function(podcast){
          db.Comment.find({podcast: req.params.podcastId})
            .populate('_owner').exec()
            .then(function(allComments) {
               res.json(allComments);
             }, function(err) {
               console.log('commentsController.index error', err);
             });
          }, function(err) {
            res.status(401).json({
              "message" : "UnauthorizedError: must be subscribed"
            });
          })
      }, function(err){
        console.log("error finding podcast in commentsController.index", err)
      });

  }

function create(comment) {
  comment.created_at = Date.now();
  console.log(comment.room);
  return db.Comment.create(comment)
}

function upvote(upvote) {
  return db.Comment.findOneAndUpdate({_id: upvote.comment}, { $addToSet: { upvoters: upvote.user }}, { new: true })
  .populate('_owner').exec();
}

function unvote(unvote) {
  return db.Comment.findOneAndUpdate({_id: unvote.comment}, { $pull: { upvoters: unvote.user }}, { new: true })
  .populate('_owner').exec();
}


// export public methods here
module.exports = {
  index: index,
  create: create,
  upvote: upvote,
  unvote: unvote
};
