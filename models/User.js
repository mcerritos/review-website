const mongoose=require('mongoose');


const UserSchema=new mongoose.Schema({
	username:String,
	password:String,
});

const User=mongoose.model('User',ReviewSchema);

module.exports=User;