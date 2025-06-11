// src/routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');

// Update post
router.put('/posts/:id', postController.updatePost);

// Delete post
router.delete('/posts/:id', postController.deletePost);

module.exports = router;
