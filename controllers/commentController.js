const Post = require('../models/Post');
const User = require('../models/User');


const postComments = async (req, res) => {
    const postId = req.params.postId;
    const { body } = req.body;
    const user = req.user; 
    try{
        const post = await Post.findById(postId);
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
    
        const comment = {
          body,
          author: user._id
        };
    
        post.comments.push(comment);
        await post.save();
    
        res.json({ message: 'Comment added successfully', comment });
    }
    catch(error){
        
    }
}

const deleteComments = async (req, res) => {
    const { postId, commentId } = req.params;
    const author = req.user.username; 
    
    try {
        const updatedPost = await Post.findByIdAndUpdate(
          postId,
          { $pull: { comments: { _id: commentId, author } } },
          { new: true }
        );
    
        if (updatedPost) {
          res.json({ message: 'Comment deleted successfully', post: updatedPost });
        } else {
          res.status(404).json({ message: 'Post or comment not found, or you do not have permission to delete the comment' });
        }
      } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the comment' });
      }    
}

const updateComments = async (req, res) => {
    const { postId, commentId } = req.params;
    const { body } = req.body;
    const author = req.user.username; 
    try {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId, 'comments._id': commentId, 'comments.author': author },
          { $set: { 'comments.$.body': body } },
          { new: true }
        );
    
        if (updatedPost) {
          res.json({ message: 'Comment updated successfully', post: updatedPost });
        } else {
          res.status(404).json({ message: 'Post or comment not found, or you do not have permission to update the comment' });
        }
      } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the comment' });
      }
}

const likePost = async (req, res) => {
    const postId = req.params.postId;
    const user = req.user;
    // console.log(user._id);
    try {
        const post = await Post.findById(postId);
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
        const userIndex = post.likes.findIndex(like => like.author === user._id);
        if (userIndex > -1) {
          // splice 
          post.likes.splice(userIndex, 1); // at user index, remove onme element https://www.w3schools.com/JSREF/jsref_splice.asp
          await post.save();
          return res.json({ message: 'Like removed successfully' });
        }
    
        post.likes.push({ author: user._id });
        await post.save();
    
        res.json({ message: 'Post liked successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while liking the post' });
      }
}

const bookmarkPost = async (req, res) => {
    const postId = req.params.postId;
    const user = req.user;
    try {
        const post = await Post.findById(postId);
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
    
        const userIndex = post.bookmarks.findIndex(bookmark => bookmark.author === user._id);
        if (userIndex > -1) {
          post.bookmarks.splice(userIndex, 1); 
          await post.save();
          return res.json({ message: 'Bookmark removed successfully' });
        }
    
        post.bookmarks.push({ author: user._id });
        await post.save();
    
        res.json({ message: 'Post bookmarked successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while bookmarking the post' });
      }
}
module.exports = {
    postComments,
    deleteComments,
    updateComments,
    likePost,
    bookmarkPost
  };