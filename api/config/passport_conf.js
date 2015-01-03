var LocalStrategy     = require('passport-local').Strategy,
    User       		    = require('../models/user_document');


module.exports = function (passport) {

  passport.serializeUser(function (user, callback) {
    callback(null, user.id);
  });

  passport.deserializeUser(function (id, callback) {
    User.findById(id, function (err, user) {
      callback(err, user._id);
    });
  });




  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password'
  },

  function (email, password, callback) {

    User.findOne({ 'local.email': email }, function (err, user) {

      if (err)
        callback(err);

      if (user)
        callback(null, false);

      else
        callback(null, true);


    });

  }))

  passport.use('local-login', new LocalStrategy({
    usernameField     : 'email',
    passwordField     : 'password',
    passReqToCallback : true
  },

  function (req, email, password, callback) {

    User.findOne({ 'local.email': email }, function (err, user) {

      if (err)
        callback(err);

      else if (!user)
        callback(null, false);

      else if (!user.validPassword(password))
        callback(null, false);

      else
        callback(null, user);

    });

  }))

};
