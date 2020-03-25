const express=require('express');
const router=express.Router();
const db=require('../models');
const ctrl=require('../controllers');

<<<<<<< HEAD
=======
//Get Games index
router.get('/games',ctrl.apiCtrl.findAll);

//Get game info
router.get('/games/:gameId',ctrl.apiCtrl.findOne);

//Get review 
router.get('/games/:gameId/reviews/:reviewId',ctrl.apiCtrl.findReview);

//post review
router.post('/games/:gameId/reviews',ctrl.apiCtrl.createReview);

//update review
router.put('/games:gameId/reviews/:reviewId',ctrl.apiCtrl.updateReview);

//delete review
router.delete('/games/:gameId/reviews/:reviewId',ctrl.apiCtrl.deleteReview);


module.exports=router;
>>>>>>> submaster
