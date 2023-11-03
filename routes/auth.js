const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');
require('dotenv').config();

const router = express.Router();

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email', 'birthday', 'gender', 'friends']
},
function(accessToken, refreshToken, profile, cb) {
    // profile._json contains the user data returned from Facebook
    User.findOrCreate({
      where: { facebookId: profile.id },
      defaults: {
        email: profile.emails[0].value,
        birthday: profile._json.birthday,
        gender: profile._json.gender,
        photos: profile.photos ? profile.photos.map(photo => photo.value) : [],
        friends: profile._json.friends.data,
      }
    }).then(([user, created]) => {
      return cb(null, user);
    }).catch((err) => {
      return cb(err);
    });
  }));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findByPk(id).then((user) => {
    cb(null, user);
  });
});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/profile');
  }
);

module.exports = router;