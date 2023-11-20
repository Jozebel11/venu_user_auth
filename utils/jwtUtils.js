const jwt = require('jsonwebtoken');

const generateToken = user => {
  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const verifyToken = token => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };