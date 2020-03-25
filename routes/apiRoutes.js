const express=require('express');
const router=express.Router();
const db=require('../models');
const ctrl=require('../controllers');

// GET Cities Index
router.get('/games', ctrl.apiCtrl.findAll);
router.get('/games/:gameId', ctrl.apiCtrl.findOne);

// CRUD REVIEW ROUTES
router.get('/games/:gameId/reviews/:reviewId', ctrl.apiCtrl.findReview);
router.post('/games/:gameId/reviews', ctrl.apiCtrl.createReview);
router.put('/games/:gameId/reviews/:reviewId', ctrl.apiCtrl.updateReview);
router.delete('/games/:gameId/review/:reviewId', ctrl.apiCtrl.deleteReview);

module.exports = router;