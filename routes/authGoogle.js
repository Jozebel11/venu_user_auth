const GoogleStrategy = require('passport-google-oauth20').Strategy;
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");
const User = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
      // Here, you would find or create a user in your database
      // For example:
      console.log(profile);
      let [user, created] = await User.findOrCreate({
        where: { 
          userId: profile.id,
        },
        defaults: {
          provider: profile.provider,
          name: profile.displayName,
          gender: profile.gender,
          email: profile._json.email, // Make sure this matches your User model
          birthday: profile._json.birthday
        }
      });
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
      return done(null, token);
    } catch (error) {
      console.error('Error during findOrCreate:', error.message);
      return cb(error.stack);
    }
  }
));
 
router.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect success.
    // req.user contains the authenticated user.
    const user = req.user;

    // Generate a JWT
    const token = jwt.sign(user, 'YOUR_SECRET_KEY', { expiresIn: '24h' });

   
    res.redirect(`myapp://login?token=${token}`);
  });

module.exports = router;