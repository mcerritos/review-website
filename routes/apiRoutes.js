const express=require('express');
const router=express.Router();
const db=require('../models');
const ctrl=require('../controllers');

//Get Games index
router.get('/games',ctrl.apiCtrl.findAll);

//Get game info
router.get('/games/:gameId',ctrl.apiCtrl.findOne);

//get game by name
router.post('/games/search/:keywords', ctrl.apiCtrl.keywordSearch);

//Get review 
router.get('/games/:gameId/reviews/:reviewId',ctrl.apiCtrl.findReview);

//post review
router.post('/games/:gameId/reviews',ctrl.apiCtrl.createReview);

//update review
router.put('/games/:gameId/reviews/:reviewId',ctrl.apiCtrl.updateReview);

//delete review
router.delete('/games/:gameId/reviews/:reviewId',ctrl.apiCtrl.deleteReview);

// USER ROUTES

// create user
router.post('/register', ctrl.authCtrl.register);

//create user session(?)
router.post('/login', ctrl.authCtrl.login);

//end user session
router.delete('/logout', ctrl.authCtrl.logout);

//check user login
router.get('/verify', ctrl.authCtrl.verify);

//find user
router.get('/profile', ctrl.authCtrl.findUser);

module.exports=router;

