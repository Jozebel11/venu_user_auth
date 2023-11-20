const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      throw new Error('No token provided');
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw new Error('Invalid token');
    }

    // Add the user information to the request object
    req.user = decoded; // assuming the token contains user information

    // Proceed to the next middleware/route handler
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = authenticate;