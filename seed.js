const db=require('./models');


const games=[
	{
		name:'Mushroom Collector',
		date:new Date('2016,09,30'),
		image:'/images/startscreen.png',
		genre: ["RPG"]
	},
	{
		name:'Simply Shooting game',
		date:new Date(Date.now()),
		image:'/images/Selection_001.png',
		genre: ["Shooter"]
	},
	{
		name:'Pac-Man',
		date:new Date('1980,07,01'),
		image:'/images/pacman.jpg',
		genre: ["Arcade Game"]
	},
	{
		name:'Final Fantasy VII',
		date:new Date('1997,1,31'),
		image:'/images/ff7.jpg',
		genre: ["RPG", "Turn-Based Strategy"]
	},
	{
		name:'Fallout 2',
		date:new Date('1998,10,29'),
		image:'/images/FO2.jpg',
		genre: ["RPG", "Turn-Based Strategy"]
	},
	{
		name:'Halo: Combat Evolved',
		date:new Date('2001,11,15'),
		image:'/images/Halo.jpg',
		genre: ["Shooter"]
	},
	{
		name:'Super Mario World',
		date:new Date('1990,11,21'),
		image:'/images/mario_w.jpg',
		genre: ["Platformer"]
	},
	{
		name:'Metal Gear Solid',
		date:new Date('1998,09,03'),
		image:'/images/MGS.jpg',
		genre: ["Shooter", "RPG"]
	},
	{
		name:'Zelda ',
		date:new Date('1998,11,21'),
		image:'/images/OOT.jpg',
		genre: ["Adventure","RPG"]
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

	