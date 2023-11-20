const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/jwtUtils');
const passport = require("passport");
const User = require('../models/user');
const FacebookStrategy = require('passport-facebook').Strategy;

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email', 'gender', 'birthday', 'friends']
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          // Here, you would find or create a user in your database
          // For example:
          console.log(profile);
          let [user, created] = await User.findOrCreate({
            where: { 
              facebookId: profile.id,
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
      }));
      
      
      passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser(async (id, done) => {
        try {
          let user = await User.findByPk(id);
          done(null, user);
        } catch (error) {
          done(error);
        }
      });

//routes

router.get("/auth/facebook",  passport.authenticate("facebook"));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }),
(req, res) => {

  const token = generateToken(req.user);
  res.redirect(`/profile?token=${token}`);
});
router.get('/logout', function(req, res){
  req.logout(function(err) {
    if (err) { return next(err); }
    // destroy session data
    req.session.destroy(function (err) {
      // cannot access session here anymore
      if (err) {
        console.error(`Error: Failed to destroy the session during logout. Error: ${err}`);
        next(err);
      } else {
        // clear the cookie and redirect the user
        res.clearCookie('connect.sid'); // The cookie that contains the session id
        res.redirect('/'); // Redirect to the desired page after logout
      }
    });
  });
});



module.exports = router;
