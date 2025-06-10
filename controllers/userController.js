const User = require('../models/user');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getHistory = async (req, res) => {
  try {
    // In a real app, you would fetch user history from the database
    // This is a placeholder implementation
    const [history] = await db.promise().query(
      'SELECT * FROM history WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    
    res.json(history);
  } catch (err) {
    console.error('Get history error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};