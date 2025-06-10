const db = require('../config/db');

class Blog {
  static async create(title, content, imagePath, userId) {
    const [result] = await db.promise().query(
      'INSERT INTO blogs (title, content, image_path, user_id) VALUES (?, ?, ?, ?)',
      [title, content, imagePath, userId]
    );
    return result.insertId;
  }

  static async getAll() {
    const [rows] = await db.promise().query(`
      SELECT b.*, u.username 
      FROM blogs b 
      JOIN users u ON b.user_id = u.id 
      ORDER BY b.created_at DESC
    `);
    return rows;
  }

  static async getByUserId(userId) {
    const [rows] = await db.promise().query(
      'SELECT * FROM blogs WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.promise().query('SELECT * FROM blogs WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = Blog;