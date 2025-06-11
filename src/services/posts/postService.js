// src/services/postService.js
const { Post } = require('../../models');

const updatePost = async (id, data) => {
  const [updated] = await Post.update(data, { where: { id } });
  return updated; // akan bernilai 1 jika berhasil, 0 jika tidak ditemukan
};

const deletePost = async (id) => {
  const deleted = await Post.destroy({ where: { id } });
  return deleted; // akan bernilai 1 jika berhasil, 0 jika tidak ditemukan
};

module.exports = {
  updatePost,
  deletePost,
};
