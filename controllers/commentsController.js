var db = require('../models');
var controllers = require('../controllers');

function index(req, res) {
  return db.Comment.find({})
    .populate('_owner').exec()

}

// export public methods here
module.exports = {
  index: index //,
  // create: create,
  // upvote: upvote,
  // unvote: unvote
};
