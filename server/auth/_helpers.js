const crypto = require('crypto');

function comparePass(userPassword, databasePassword) {
  return crypto.createHash('md5').update(userPassword).digest("hex") == databasePassword;
}

function loginRequired(req, res, next) {
  if (!req.user) {
    return res.redirect('/auth/login');
  }
  return next();
}

module.exports = {
  comparePass,
  loginRequired
};