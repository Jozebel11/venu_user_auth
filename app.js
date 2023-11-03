require('dotenv').config();
const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const session = require('express-session');
const User = require('./models/userModel'); // Import your user model

const app = express();

// Passport setup
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email', 'gender', 'birthday', 'friends']
  },
  async (accessToken, refreshToken, profile, cb) => {
    // Here, you would find or create a user in your database
    // For example:
    let user = await User.findOrCreate({
      where: { facebookId: profile.id },
      defaults: {
        name: profile.displayName,
        email: profile._json.email, // Make sure to get the correct path for the email
        gender: profile._json.gender, // Same for gender
        birthday: profile._json.birthday, // And birthday
        photos: profile.photos ? profile.photos.map(photo => photo.value) : [], // If there are photos, store their URLs
        // Similarly, add other fields as necessary
      }
    });
    return cb(null, user);
  }
));

// Configure session management
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  let user = await User.findByPk(id);
  done(null, user);
});

const authRoutes = require('./routes/auth');

// Define the home route
app.get('/', (req, res) => {
  res.send('Welcome to the Dating App!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});