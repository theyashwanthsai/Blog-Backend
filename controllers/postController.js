const Post = require('../models/Post');
const User = require('../models/User');

const createPost = async (req, res) => {
  const { title, content, tags } = req.body;
  const author = req.user.username;
  const user = req.user;
  console.log(user);
  try {
    const post = new Post({ title, content, tags, author });
    await post.save();
    console.log(user._id);
    console.log(user.customId);
    await User.findOneAndUpdate({ username: user.username }, { $push: { posts: post._id } });
    
    res.json({ message: 'Post created successfully', postId: post._id });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while creating the post' });
  }
};

const updatePost = async (req, res) => {
  const postId = req.params.postId;
  const { title, content, tags } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(postId, { title, content, tags }, { new: true });
    if (post) {
      res.json({ message: 'Post updated successfully' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the post' });
  }
};

const deletePost = async (req, res) => {
  const postId = req.params.postId;

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (deletedPost) {
      res.json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the post' });
  }
};

const getAllPosts = async (req, res) => {
  try{
    const posts = await Post.find({});
    res.json({ posts });
  }
  catch(error){
    res.status(500).json({ message: 'An error occurred while fetching the post' });
  }
}

const getById = async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    res.json({ post })
  }
  catch(error){
    res.status(500).json({ message: 'An error occurred while fetching the post' });
  }
}

const getTrendingPosts = async(req, res) => {
  try {
    const trendingPosts = await Post.find({}).sort({ likes: -1 }).limit(5) ;

    res.json({ trendingPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching trending posts' });
  }
}
module.exports = {

  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getById,
  getTrendingPosts

};
