
'use strict';

var _               = require('underscore'),
    async           = require('async'),

    stringToUrl     = require('../libs/stringToUrl'),
    Collection      = require('../models/collection_document'),
    Story           = require('../models/story_document'),
    User            = require('../models/user_document');




exports._post_collection = function (req, res) {

  var userId        = req.params.userId,
      title         = req.body.title,
      description   = req.body.description;

  if (!userId || !title)
    res.status(404).send({errorMessage: 'need userId && title'});


  User.getById(userId, function (err, userObj) {

    if (err) return res.status(400).send({errorMessage: 'no user found'});

    var collection = new Collection();

    collection.title                 = title;
    collection.userInfos             = {};
    collection.userInfos.userId      = userObj._id;
    collection.userInfos.username    = userObj.username;
    collection.description           = description;
    collection.url                   = stringToUrl(title);

    collection.save(function (err, newCollection) {
      if (err) return res.status(500).send({errorMessage: err});

      res.sendStatus(200);
    });

  });

};
