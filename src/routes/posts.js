const Router = require('express')
const {
    getAllPostsController,
    createPostsController,
} = require('../controller/posts/posts');

const { authMiddleware } = require('../middlewares/authorization');



const router = Router()

//posts routes
router.get('/getPosts', [], getAllPostsController)
router.post('/createPosts', [authMiddleware], createPostsController)




module.exports = router