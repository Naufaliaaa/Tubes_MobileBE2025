const Blog = require('../models/blog');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images only!');
    }
  }
}).single('image');

exports.uploadImage = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    next();
  });
};

exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;
    const imagePath = req.file ? req.file.path : null;

    const blogId = await Blog.create(title, content, imagePath, userId);
    const blog = await Blog.getById(blogId);

    res.status(201).json({ 
      message: 'Blog created successfully',
      blog
    });
  } catch (err) {
    console.error('Create blog error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.getAll();
    res.json(blogs);
  } catch (err) {
    console.error('Get blogs error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getUserBlogs = async (req, res) => {
  try {
    const userId = req.user.id;
    const blogs = await Blog.getByUserId(userId);
    res.json(blogs);
  } catch (err) {
    console.error('Get user blogs error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};