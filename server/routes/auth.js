const auth = require('./controllers/auth');
module.exports = function (router) {
  router.get('/logout', auth.logout);
  router.get('/login', auth.loginGet);
  router.post('/login', auth.loginPost);
  return router;
};