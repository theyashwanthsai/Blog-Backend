const jwt = require('jsonwebtoken');
const User = require('../models/User');
const SECRET = 'ASSESSMENT'; // Publicly available just for the sake of this assessment

const signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const lastUser = await User.findOne({}, {}, { sort: { customId: -1 } });
    const lastCustomId = lastUser ? lastUser.customId : 0;
    const customId = lastCustomId + 1;
    
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(403).json({ message: 'User already exists' });
    }

    const newUser = new User({ username, password, customId });
    await newUser.save();

    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'User created successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while signing up' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while logging in' });
  }
};

module.exports = {
  signup,
  login
};
