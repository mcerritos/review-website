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

const createReview = (req, res) => {
	db.Review.create(req.body, (err, newReview) => {
		if (err) {
		     return res.status(500).json({status: 400, error: 'database error!'});
		   }

		db.Game.findById(req.params.gameId, (err, foundGame) => {
			if(err) {
				return res.status(400).json({status: 400, error: 'game not found!'})
			}

		foundGame.posts.push(newReview);

		foundCity.save( (err, savedCity) => {
		        if (err) {
		          return res.status(400).json({status: 400, error: 'Unable to save city.'});
		        }
		})
	})
};

const updateReview = (req, res) => {
		db.Game.findById(req.params.gameId, (err, foundGame) => {
			if(err) {
				return res.status(400).json({status: 400, error: 'game not found!'})
			}

			const updatingReview = foundGame.posts.id(req.params.reviewId);

			updatingReview.title = req.body.title;
			updatingReview.content = req.body.content;

			foundCity.save((err, savedCity) => {
			      if (err) {
			        return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
			      }

			// Update Post in Post Collection
			      db.Review.findByIdAndUpdate(req.params.postId, req.body, {new: true}, (err, updatedPost) => {
			        if (err) {
			          return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
			        }

			        res.json(updatedPost);
				});
			})
		})
	};

const deleteReview = (req, res) => {
  db.Game.findById(req.params.gameId, (err, foundGame) => {
    if (err) {
      return res.status(400).json({status: 400, error: 'Game not found! :('});
    }

    // Find Post By ID
    const removeReview = foundGame.reviews.id(req.params.reviewId);

    if (!removeReview) {
      return res.status(400).json({status: 400, error: 'Could not find review'});
    }
    removeReview.remove();

    foundGame.save((err, savedGame) => {
      if (err) {
        return res.status(400).json({status: 400, error: 'Your game was not saved'});
      }

      // Delete Post From Post Collection
      db.Review.findByIdAndDelete(req.params.reviewId, (err, deletedReview) => {
        if (err) {
          return res.status(400).json({status: 400, error: 'Something went wrong, review was not deleted'});
        }

        res.json(deletedPost);
      });
    });
  });
};


module.exports = {
  findAll,
  findOne,
  findReview, 
  createReview,
  updateReview, 
  deleteReview,
};