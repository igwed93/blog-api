const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const auth = require('../middleware/authMiddleware');

router.post('/', commentController.createComment);             // Create comment
router.get('/post/:postId', commentController.getCommentsByPost); // Get comments for a post
router.get('/user/:userId', commentController.getCommentsByUser); // Get comments by a user
router.put('/:id', auth, commentController.updateComment);   // update comment
router.delete('/:id', auth, commentController.deleteComment); // delete comment

module.exports = router;