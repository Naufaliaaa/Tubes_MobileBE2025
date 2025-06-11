// src/controller/postController.js
const postService = require('../services/postService');

const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const updated = await postService.updatePost(id, data);

    if (updated) {
      res.json({ success: true, message: 'Post updated successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await postService.deletePost(id);

    if (deleted) {
      res.json({ success: true, message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  updatePost,
  deletePost,
};
