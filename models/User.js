const mongoose = require('mongoose');
// const Post = require('./post');

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  customId: { type: Number },
  posts: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Post' 
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Post' 
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Post' 
  }],
  bookmarks: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Post' 
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
