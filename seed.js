const db=require('./models');


const games=[
	{
		name:'Mushroom Collector',
		date:new Date('2016,09,30'),
		image:'/images/startscreen.png'
	},
	{
		name:'Simply Shooting game',
		date:new Date(Date.now()),
		image:'/images/Selection_001.png'
	}
];

const reviewTest1={
	title:'best strategy game',
	content:'best strategy game'
}

const reviewTest2={
	title:'shooting game',
	content:"shoot'em up"
}

db.Game.create(games,(err,newgames)=>{//run it first 
	if(err){
		console.log(err);
		process.exit();
	}
	console.log(`${newgames.length} games added`);



	db.Review.create(reviewTest1,(err,newview)=>{ //run it after create games, create a view and push to first game
	if(err){
		console.log(err);
		process.exit();
	}
	console.log(newview);
	db.Game.findOne({name:'Mushroom Collector'},(err,foundgame)=>{
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

db.Review.create(reviewTest2,(err,newview)=>{ //run it after create games, create a view and push to first game
	if(err){
		console.log(err);
		process.exit();
	}
	console.log(newview);
	db.Game.findOne({name:'Simply Shooting game'},(err,foundgame)=>{
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


	//process.exit();
});

	