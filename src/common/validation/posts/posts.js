const JOI = require('joi');

const postsSchema = JOI.object({
    title: JOI.string().min(3).max(100).required(),
    deskripsi: JOI.string().min(10).max(500).required(),
});

const updatePostsSchema = postsSchema.fork(
    ['title', 'deskripsi'], 
    (field) => field.optional() // Perbaikan di sini
);

module.exports = {
    postsSchema,
    updatePostsSchema,
};