require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require("express-flash");
const authFbRoutes = require('./routes/authFacebook');
const authGoogleRoutes = require('./routes/authGoogle')
const app = express();
const cors = require('cors')



app.use(cors({ origin: true }));
// Configure session management
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }));

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.authenticate('session'));

//Use flash messages for errors, info, ect...
app.use(flash());


app.use('/', authFbRoutes);
app.use('/', authGoogleRoutes);





// Define the home route
app.get('/', (req, res) => {
  res.send('Welcome to the Dating App!');
});
app.get('/profile', (req, res) => {
    console.log(req.user)
    res.send(`Hello, ${req.user.name}, ${req.user.gender}, ${req.user.birthday}, ${req.user.email}`);
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app