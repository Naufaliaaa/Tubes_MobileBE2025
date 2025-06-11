const { user, posts } = require('../../models');
const { BaseError } = require('../../common/responses/error-response');
const { StatusCodes } = require('http-status-codes');
const { postsSchema, updatePostsSchema } = require('../../common/validation/posts/posts');
const { NotFoundError } = require('../../common/responses/error-response');

//get data postingan
const getAllposts = async () => {

    const allPosts = await posts.findAll({
        include: [{
            model: user,
            as: 'user',
        }],
    });
    return allPosts;
}


const createPosts = async (body, userId) => {
    try {
        const { error } = postsSchema.validate(body);
        if (error) {
            throw new BaseError(StatusCodes.BAD_REQUEST, error.details[0].message);
        }
        const userExist = await user.findByPk(userId);
        if (!userExist) {
            throw new NotFoundError('User not found');
        }

        const { title, deskripsi } = body;

        const newPosts = await posts.create({
            user_id:userId,
            title,
            deskripsi,
        });
        return newPosts;
        
    } catch (error) {

        throw new BaseError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error creating profile : ' + error.message);
        
    }
}


module.exports = {
    getAllposts,
    createPosts,
};