const mongoose=require('mongoose');


const ReviewSchema=new mongoose.Schema({
	title:String,
	content:String,
	game:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Game',
	},
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User',
	},
},{timestamps:true});

const Review=mongoose.model('Review',ReviewSchema);

module.exports=Review;