const mongoose=require('mongoose');

const DB_URI=process.env.MONGODB_URI||'mongodb://localhost:27017/base';

// Connect MongoDB
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log(`MongoDB error: ${err}`));

  module.exports={
	Game:require('./Game'),
	Review:require('./Review'),
	User:require('./User'),

  }