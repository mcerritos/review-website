const mongoose=require('mongoose');
const Review=require('./Review');


const GameSchema=new mongoose.Schema({
	name:String,
	date:Date,
	image:String,
	reviews:[Review.schema],
});

const Game=mongoose.model('Game',GameSchema);

module.exports=Game;