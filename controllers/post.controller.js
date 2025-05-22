const db = require('../models');
const Post = db.Post;
const User = db.User;

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id; // Assuming you have user ID in req.user after authentication

    if (!title || !content || !userId) {
      return res.status(400).json({ message: "Title, content, and userId are required" });
    }

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Author not found" });
    }

    const newPost = await Post.create({ title, content, UserId: userId });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: "Error creating post", error: err.message });
  }
};

// Get all posts with author info
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'email'],
        }
      ],
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving posts", error: err.message });
  }
};

// Get a single post by ID with author
exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'email'],
        }
      ],
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving post", error: err.message });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.UserId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this post" });
    }

    const { title, content } = req.body;
    post.title = title || post.title;
    post.content = content || post.content;

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Error updating post", error: err.message });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.UserId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }

    await post.destroy();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting post", error: err.message });
  }
};