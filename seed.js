const db=require('./models');


const games=[
	{
		name:'test data 1',
		data:'2012-2-2',
		image:'#'
	},
	{
		name:'test data 2',
		data:Date.now(),
		image:'#'
	}
];

const reviewTest={
	title:'review title test',
	content:'review content test'
}

db.Game.create(games,(err,newgames)=>{//run it first 
	if(err){
		console.log(err);
		process.exit();
	}
	console.log(`${newgames.length} games add`);




	process.exit();
});

	db.Review.create(reviewTest,(err,newview)=>{ //run it after create games, create a view and push to first game
	if(err){
		console.log(err);
		process.exit();
	}
	console.log(newview);
	db.Game.findOne({},(err,foundgame)=>{
		if(err){
		console.log(err);
		process.exit();
	}
		console.log(foundgame);
		foundgame.reviews.push(newview);
		foundgame.save((err,savegame)=>{
			if(err){
				console.log(err);
				process.exit();
			}
			console.log(savegame);
		})

	})
});