const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, postController.createPost);         // Create post
router.get('/', postController.getAllPosts);         // List all posts
router.get('/:id', postController.getPostById);      // Get one post
router.put('/:id', auth, postController.updatePost);   // update post
router.delete('/:id', auth, postController.deletePost); // delete post


module.exports = router;