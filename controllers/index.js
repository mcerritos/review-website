const db = require('../models');

//this returns a json object of all cities
const findAll = (req, res) => {
  db.Game.find({}, (err, allGames) => {
    if (err) {
      return res.status(400).json({status: 500, error: 'Please try again'});
    }

    res.json(allGames);
  });
};

// this returns a json object with one game
const findOne = (req, res) => {
  db.Game.findById(req.params.id, (err, foundGame) => {
    if (err) {
      return res.status(400).json({status: 400, error: 'Game not found.'});
    }

    res.json(foundGame);
  });
};

const findReview = (req, res ) => {
 db.Game.findById(req.params.gameId, (err, foundGame) => {
    if (err) {
      return res.status(400).json({status: 400, error: 'Something went wrong'});
    }

    // Find Post
    const foundReview = foundGame.reviews.id(req.params.reviewId);

    // Verify Post Found
    if (!foundReview) {
      return res.status(400).json({status: 400, error: 'Could not find review'});
    }

    res.json(foundReview);
  });
};



module.exports = {
  findAll,
  findOne,
  showPost, 
  createPost,
  updatePost, 
  deletePost,
};