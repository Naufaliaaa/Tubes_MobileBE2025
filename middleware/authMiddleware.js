const User = require('../models/user');

const authMiddleware = async(req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = await User.verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = authMiddleware;