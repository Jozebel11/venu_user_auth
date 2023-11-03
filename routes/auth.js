const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/userModel');

// Initiate Facebook Auth
router.get('/facebook', passport.authenticate('facebook', { 
  scope: ['email', 'user_birthday', 'user_gender', 'user_friends'] 
}));

// Facebook Auth Callback
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

// Logout Route
router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

// Delete Account
router.delete('/delete-account', async (req, res) => {
  if (req.user) {
    await User.destroy({ where: { facebookId: req.user.facebookId } });
    req.logout();
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.status(200).send('Account deleted');
    });
  } else {
    res.status(401).send('User not authenticated');
  }
});

module.exports = router;