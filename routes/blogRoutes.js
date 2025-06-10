const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, blogController.getAllBlogs);
router.get('/my-blogs', authMiddleware, blogController.getUserBlogs);
router.post('/', authMiddleware, blogController.uploadImage, blogController.createBlog);

module.exports = router;