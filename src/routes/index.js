const express = require('express');

const router = express.Router();
const authRouter = require('./auth');
const userRouter = require('./user');
const postsRouter = require('./posts');


router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/posts', postsRouter);


module.exports = router;