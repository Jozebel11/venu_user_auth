const express = require('express');
const authenticate = require('../middleware/authToken');

const router = express.Router();

// A protected route
router.get('/protected', authenticate, (req, res) => {
  res.send(`Welcome, user ${req.user.userId}`);
});

module.exports = router;