const passport = require('passport');
const db = require('../database').db;

module.exports = () => {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    db.users.find({id})
      .then( (user) => { done(null, user); })
      .catch( (err) => { done(err, null)});
  });

};