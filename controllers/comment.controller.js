const db = require('../models');
const Comment = db.Comment;
const User = db.User;
const Post = db.Post;

// Create a new comment
exports.createComment = async (req, res) => {
    try {
        const { text, postId, userId } = req.body;

        if (!text || !postId || !userId) {
            return res.status(400).json({ message: 'Content, Post ID, and User ID are required.' });
        }

        const post = await Post.findByPk(postId);
        const user = await User.findByPk(userId);
        if (!post || !user) {
            return res.status(404).json({ message: 'Post or User not found.' });
        }

        const comment = await Comment.create({
            text,
            PostId: postId,
            UserId: userId,
        });

        res.status(201).json(comment);
    } catch (error) {
        console.error('Error creating comment:', error);
        return res.status(500).json({ message: 'Error creating comment', error: error.message });
    }
};


// Get comments for a specific post
exports.getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.params;

        const comments = await Comment.findAll({
            where: { PostId: postId },
            include: [{ model: User, attributes: ['id', 'username'] }],
        });

        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments by post:', error);
        return res.status(500).json({ message: 'Error retrieving comments', error: error.message});
    }
};


// Get comments by a specific user
exports.getCommentsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const comments = await Comment.findAll({
      where: { UserId: userId },
      include: [{ model: Post, attributes: ['id', 'title'] }],
    });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving comments", error: err.message });
  }
};

// Update a comment
exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);

    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.UserId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this comment" });
    }

    comment.text = req.body.text || comment.text;
    await comment.save();

    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: "Error updating comment", error: err.message });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);

    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.UserId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    await comment.destroy();
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting comment", error: err.message });
  }
};