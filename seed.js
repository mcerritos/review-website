const db=require('./models');


const games=[
	{
		name:'test data 1',
		data:new Date('2012-02-02'),
		image:'#'
	},
	{
		name:'test data 2',
		data:new Date('2018-08-08'),
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