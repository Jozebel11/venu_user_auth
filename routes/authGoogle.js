const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/jwtUtils');
const passport = require("passport");
const User = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
      // Here, you would find or create a user in your database
      // For example:
      console.log(profile);
      let [user, created] = await User.findOrCreate({
        where: { 
          googleId: profile.id,
        },
        defaults: {
          name: profile.displayName,
          gender: profile.gender,
          email: profile._json.email, // Make sure this matches your User model
          birthday: profile._json.birthday
        }
      });
      return cb(null, user);
    } catch (error) {
      console.error('Error during findOrCreate:', error.message);
      return cb(error.stack);
    }
  }
));
 
router.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    const token = generateToken(req.user);
    res.redirect(`/profile?token=${token}`);
  });