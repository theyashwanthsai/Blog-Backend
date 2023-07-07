const mongoose = require('mongoose');
// const User = require('./User');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [{
    type: String
  }],
  author: String,
  comments: [{
    body: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  bookmarks: [{
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  likes: [{
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
