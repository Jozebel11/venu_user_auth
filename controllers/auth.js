const passport = require("passport");


  exports.postLogin = () => {
    passport.authenticate("facebook")
  };

  exports.postLoginCb = () => {
    passport.authenticate('facebook', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/profile');
    }
  }

  exports.logout = (req, res) => {
    req.logout(() => {
      console.log('User has logged out.')
    })
    req.session.destroy((err) => {
      if (err)
        console.log("Error : Failed to destroy the session during logout.", err.message);
      req.user = null;
      res.redirect("/");
    });
  };
  