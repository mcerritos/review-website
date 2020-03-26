const db = require('../models');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

//this returns a json object of all things in database
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
  db.Game.findById(req.params.gameId, (err, foundGame) => {
    if (err) {
      return res.status(400).json({status: 400, error: 'Game not found.'});
    }

    res.json(foundGame);
  });
};

const keywordSearch = (req, res) => {
  db.Game.find({ name: req.params.keywords }, (err, relevantGames) => {
    if (err) {
      console.log(err);
      process.exit();
    }

    if(relevantGames.length < 1) {
      res.status(400).json({message: "No relevant games found!"});
    }
    res.json(relevantGames);
  })
};

const findReview = (req, res ) => {
 db.Game.findById(req.params.gameId, (err, foundGame) => {
    if (err) {
      return res.status(400).json({status: 400, error: 'Something went wrong'});
    }

    // Find RV
    const foundReview = foundGame.reviews.id(req.params.reviewId);

    // Check if RV
    if (!foundReview) {
      return res.status(400).json({status: 400, error: 'Could not find review'});
    }

    res.json(foundReview);
  });
};

const createReview = (req, res) => {
	db.Review.create(req.body, (err, newReview) => {
		if (err) {
		     return res.status(500).json({status: 500, error: 'database error!'});
		   }

		db.Game.findById(req.params.gameId, (err, foundGame) => {
			if(err) {
				return res.status(400).json({status: 400, error: 'game not found!'})
			}

		foundGame.reviews.push(newReview);

		foundGame.save( (err, savedGame) => {
		        if (err) {
		          return res.status(400).json({status: 400, error: 'Unable to save Game.'});
		        }

            return res.status(201).json({status: 201, message: "review saved!"})
		  })
	  })
  })
};

const updateReview = (req, res) => {
		db.Game.findById(req.params.gameId, (err, foundGame) => {
			if(err) {
				return res.status(400).json({status: 400, error: 'game not found!'})
			}

			let updatingReview = foundGame.reviews.id(req.params.reviewId);

      if (!updatingReview) {
        return res.status(400).json({status: 400, message: "could not find review"})
      }

			updatingReview.title = req.body.title;
			updatingReview.content = req.body.content;

			foundGame.save((err, savedGame) => {
			      if (err) {
			        return res.status(400).json({status: 400, error: 'game was not saved'});
			      }

            //Update Review
			      db.Review.findByIdAndUpdate(req.params.reviewId, req.body, {new: true}, (err, updatedReview) => {
			        if (err) {
			          return res.status(400).json({status: 400, error: 'final review update was not possible.'});
			        }

			        res.json(updatedReview);
				});
			})
		})
	};

const deleteReview = (req, res) => {
  db.Game.findById(req.params.gameId, (err, foundGame) => {
    if (err) {
      return res.status(400).json({status: 400, error: 'Game not found! :('});
    }

    // Find By ID
    const removeReview = foundGame.reviews.id(req.params.reviewId);

    if (!removeReview) {
      return res.status(400).json({status: 400, error: 'Could not find review'});
    }
    removeReview.remove();

    foundGame.save((err, savedGame) => {
      if (err) {
        return res.status(400).json({status: 400, error: 'Your game was not saved'});
      }

      // Delete Review
      db.Review.findByIdAndDelete(req.params.reviewId, (err, deletedReview) => {
        if (err) {
          return res.status(400).json({status: 400, error: 'Something went wrong, review was not deleted'});
        }

        res.json(deletedReview);
      });
    });
  });
};

module.exports = {
  findAll,
  findOne,
  keywordSearch,
  findReview, 
  createReview,
  updateReview, 
  deleteReview,
};