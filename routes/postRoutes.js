const express = require('express');
const postController = require('../controllers/postController');
const { authenticateJwt } = require('../middlewares/authentication');
const commentController = require('../controllers/commentController');

const router = express.Router();

router.post('/post', authenticateJwt, postController.createPost);
router.put('/post/:postId', authenticateJwt, postController.updatePost);
router.delete('/post/:postId', authenticateJwt, postController.deletePost);
router.get('/post', authenticateJwt, postController.getAllPosts);
router.get('/post/:postId', authenticateJwt, postController.getById);
router.get('/trending', authenticateJwt, postController.getTrendingPosts)

router.post('/post/:postId/comments', authenticateJwt, commentController.postComments);
router.put('/post/:postId/comments/:commentId', authenticateJwt, commentController.updateComments);
router.delete('/post/:postId/comments/:commentId', authenticateJwt, commentController.deleteComments);

router.post('/post/:postId/like', authenticateJwt, commentController.likePost);
router.post('/post/:postId/bookmark', authenticateJwt, commentController.bookmarkPost);
module.exports = router;
