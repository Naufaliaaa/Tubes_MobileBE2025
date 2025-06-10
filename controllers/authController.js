const User = require('../models/user');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const userId = await User.create(username, email, password);
    const user = await User.findById(userId);

    // Generate token
    const token = User.generateToken(user);

    res.status(201).json({ 
      message: 'User registered successfully',
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      token
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await User.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = User.generateToken(user);

    res.json({ 
      message: 'Logged in successfully',
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      token
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.logout = async (req, res) => {
  try {
    // In a real app, you might want to invalidate the token
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};