
'use strict';

var _               = require('underscore'),
    async           = require('async'),

    Story           = require('../models/story_document'),
    User            = require('../models/user_document');


exports._post_story = function (req, res) {
  var body      = req.body,
      username  = req.params.username;
  if (!username || !body.url || !body.title)
    res.sendStatus(400);

  User.getByUsername(username, function (err, userObj) {

    if (err) return res.sendStatus(400);

    var story = new Story();

    story.url                   = body.url;
    story.title                 = body.title;
    story.userInfos             = {};
    story.userInfos.userId      = userObj._id;
    story.userInfos.username    = userObj.username;
    story.description           = body.description;

    story.save(function (err, newStory) {
      if (err) return res.sendStatus(err);

      res.sendStatus(200);
    });

  });

};

exports._get_all_stories = function (req, res) {
  var userParam = req.params.user;

  if (!userParam) res.sendStatus(400);

  User.getByUsername(userParam, function (err, userObj) {

    if (err) return res.sendStatus(400);

    async.map(userObj.stories.list,

      function (storyId, callback) {
        Story.get(storyId, callback);
      },

      function (err, results) {
          if (!err) res.json(results);
      }
    );

  });
};
