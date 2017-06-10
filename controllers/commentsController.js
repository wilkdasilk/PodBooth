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
      //update to error if not live
      db.Podcast.findOne({_id: req.params.podcastId, $or: [{subscribers: user._id},{_owner: user._id}]})
        .then(function(podcast){
          if (!podcast) {
            res.status(401).json({
              "message" : "UnauthorizedError: must be subscribed"
            });
          }
          else if (!podcast.latestBroadcast) {
            //no broadcast yet, therefore no comments
            res.sendStatus(204);
          } else {
            console.log("index found podcast with broadcast",podcast);
            db.Comment.find({broadcast: podcast.latestBroadcast})
              .populate('_owner').exec()
              .then(function(allComments) {
                 res.json(allComments);
               }, function(err) {
                 console.log('commentsController.index error', err);
               });
          }
        }, function(err) {
            console.log("error finding Podcast", err);
          })
      }, function(err){
        console.log("error finding podcast in commentsController.index", err)
      });

  }

function create(comment) {
  comment.created_at = Date.now();
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
