
'use strict';

var passport          = require('passport'),
    passportConfig    = require('../config/passport_conf')(passport),
    User              = require('../models/user_document'),
    Story             = require('../models/story_document');


exports._get_user = function (req, res) {

  if (!req.params.user)
    return res.sendStatus(400);

  var isUsername = req.params.user.length <= 20;

  if (isUsername) {
    var username  = req.params.user;

      User.getByUsername(username, function (err, userObj) {
        if (err) {
          res.status(404).send('Sorry, We can\'t find this user.');
        }
        else {
          User.mapToClient(userObj, req.session.passport.user, function (err, userMapped) {
            if (err)
              res.status(500).send({errorMessage: err});
            else
              res.json(userMapped);
          });
        }

      });
  }
  else {
    var userId = req.params.user;

    User.getById(userId, function (err, userObj) {
      if (err) {
        res.status(404).send('Sorry, We can\'t find this user.');
      }
      else {
        User.mapToClient(userObj, req.session.passport.user, function (err, userMapped) {
          if (err)
            res.status(500).send({errorMessage: err});
          else
            res.json(userMapped);
        });
      }

    });
  }

};

exports._post_signup_user = function (req, res) {

  var body = req.body;

  if (!body.username || !body.password || !body.email)
    return res.sendStatus(400);

  passport.authenticate('local-signup', function (err, isSuccess) {

    if (err) return res.sendStatus(400);
    if (!isSuccess) return res.sendStatus(400);

   var user = new User();

   user.email          = body.email;
   user.username       = body.username;
   user.local.password = user.generateHash(body.password);
   user.local.email    = body.email;
   user.description    = body.description;


  user.save(function (err, newUser) {
    if (err) return res.sendStatus(400);

    req.logIn(newUser, function (err) {
      if (err) return res.sendStatus('Cookie Problem');

      User.mapToClient(newUser, req.session.passport.user.userId,function (err, userMapped) {
        if (!err) {
          res.json(userMapped);
        }
      });

    });

  });

  })(req, res);

};

exports._post_login_user = function (req, res) {

    passport.authenticate('local-login', function (err, user) {
    if (err) return res.sendStatus(400);
    if (!user) return res.sendStatus(400);

    req.logIn(user, function (err) {
      if (err) res.sendStatus('Cookie Problem');

      User.mapToClient(user, req.session.passport.user,function (err, userMapped) {
        if (!err) {
          res.json(userMapped);
        }

      });

    });

  })(req, res);

};

exports._post_logout_user = function (req, res) {

  if (req.isAuthenticated()) {
    req.logout();
    res.end();
  }
  else {
    res.sendStatus(200, 'ALREADY LOGOUT');
  }

};

exports._post_follow = function (req, res) {

  var usernameToFollow  = req.params.username,
      userId            = req.session.passport.user;

  if (!usernameToFollow && !userId)
    return res.sendStatus(500);

  User.follow(userId, usernameToFollow, function (err) {

    if (err)
      res.status(500).send({errorMessage: err});
    else
      res.send();

  });

};

exports._post_unfollow = function (req, res) {

  var usernameToUnfollow  = req.params.username,
      userId              = req.session.passport.user;


  if (!usernameToUnfollow && !userId)
    return res.sendStatus(500);

  User.unfollow(userId, usernameToUnfollow, function (err) {

    if (err)
      res.status(500).send({errorMessage: err});
    else
      res.send();

  });

};

exports._get_stories_feed = function (req, res) {

  var userId  = req.params.userId;

  if (!userId)
    return res.sendStatus(500);

  User.getById(userId, function (err, userObj) {

    if (!userObj.following.list)
      return res.send();

    Story.getStories(userObj.following.list, function (err, storyList) {
      if (err)
        res.status(500).send({errorMessage: err});
      else
        res.send(storyList);
    });


  });

};
