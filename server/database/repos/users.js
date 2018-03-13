'use strict';
var sql = require('../sql').users;
module.exports = (rep, pgp) => {
  return {
    checkUser: values => rep.oneOrNone(sql.checkUser, values),
    find: values => rep.oneOrNone(sql.find, values)
  }
};