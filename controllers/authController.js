const passport = require('passport');
const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config'); 

exports.facebook = (req, res, next) => {
  passport.authenticate('facebook', {
    scope: ['email', 'user_photos'] 
  }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        error: info.message  
      });
    }
    // Generate JWT
    const token = jwt.sign({ id: user.id }, jwtSecret, {
      expiresIn: '7d' 
    });
    return res.json({ token });
  })(req, res, next);
}

exports.logout = (req, res) => {
  req.logout();
  res.sendStatus(200);
}