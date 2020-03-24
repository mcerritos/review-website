const express=require('express');
const router=express.Router();

//Home page view
router.get('/',(req,res)=>{
	res.sendFile('views/startpage.html',{
		root:__dirname+'/../',
	});
});

//About page view
router.get('/about',(req,res)=>{
	res.sendFile('views/about.html',{ //TODO:about.html
		root:__dirname+'/../',
	});
});

//Game index page view
router.get('/games',(req,res)=>{
	res.sendFile('views/gamesindex.html',{
		root:__dirname+'/../',
	});
});

//Game info page view
router.get('/games/:gameId',(req,res)=>{
	res.sendFile('views/gameinfo.html',{
		root:__dirname+'/../',
	})
});


//---------------------------REVIEW-----------
//TODO:every thing of review

//new review page view
router.get('/games/:gameId/reviews/new',(req,res)=>{
	res.sendFile('#',{
		root:__dirname+'/../',
	});
});

//review edit view
router.get('/games/:gameId/reviews/:reviewId',(req,res)=>{
	res.sendFile('#',{
		root:__dirname+'/../',
	});
});


module.exports=router;