const BaseResponse = require('../../common/responses/base-response');
const { StatusCodes } = require('http-status-codes');
const { getAllposts, createPosts } = require('../../services/posts/posts');
const { BaseError } = require('../../common/responses/error-response');

const getAllPostsController = async (req, res, next) => {
    try {
        const result = await getAllposts();
        return res.status(StatusCodes.OK).json(
            new BaseResponse({
                status: StatusCodes.OK,
                message: 'Data Postingan berhasil diambil',
                data: result,
            })
        );
    } catch (error) {
        next(error);
    }
}

const createPostsController = async (req, res, next) => {
    try {
        const { body } = req;
        const userId = req.user.id;
        const result = await createPosts(body, userId);
        return res.status(StatusCodes.CREATED).json(
            new BaseResponse({
                status: StatusCodes.CREATED,
                message: 'Postingan berhasil dibuat',
                data: result,
            })
        );
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllPostsController,
    createPostsController,
};