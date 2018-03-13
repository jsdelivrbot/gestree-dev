const passport = require('../../auth/local');
const db = require('../../database/').db;

module.exports = {
  loginPost(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err) { redirectToLogin(res); }
      if (!user) { redirectToLogin(res); }
      if (user) {
        req.logIn(user, function (err) {
          if (err) { redirectToLogin(res); }
          redirectToIndex(res);
        });
      }
    })(req, res, next);
  },
  loginGet(req, res, next) {
    res.sendFile('login.html', {
      root: './public'
    });
  },
  logout(req, res, next) {
    req.logout();
    redirectToIndex(res);
  }
};

function redirectToIndex(res) {
  res.redirect('/');
}
function redirectToLogin(res) {
  res.redirect('/auth/login');
}