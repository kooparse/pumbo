var _                 = require('underscore'),
    mongoose          = require('mongoose'),
    db                = require('../config/db_conf'),

    User              = require('./user_document'),
    Story             = require('./story_document'),

    userHelper        = require('../helpers/users_helper'),

    async             = require('async'),
    bcrypt            = require('bcrypt'),
    Schema            = mongoose.Schema,

    ObjectId          = Schema.Types.ObjectId;




var userSchema = new Schema({

  username        : { type: String, unique: true, required: true },

  local           : {
                      email     : { type: String, required: true, unique: true },
                      password  : { type: String, required: true }
                    },

  email           : { type: String, required: true , unique: true },

  description     : { type: String },

  creation_date   : { type: Date, required: true, default: Date.now },

  following       : {
                      list  : [ { type: ObjectId } ],
                      count : { type: Number, default: 0 }
                    },

  followers       : {
                      list  : [ { type: ObjectId } ],
                      count : { type: Number, default: 0 }
                    },

  stories         : {
                      list  : [ { type: ObjectId } ],
                      count : { type: Number, default: 0 }
                    },

  collections     : {
                      list  : [ { type: ObjectId } ],
                      count : { type: Number, default: 0 }
                    }

});

userSchema.statics.getByUsername = function (username, callback) {
  if (!username) callback(true);

  this.findOne({ username: username }, function (err, userObj) {
    if (err) return callback(true);

    if (userObj)
      callback(null, userObj);
    else
      callback(true);
  });
};

userSchema.statics.getById = function (userId, callback) {

  if (!userId) callback(true);

  this.findOne({ _id: userId }, function (err, userObj) {
    if (err) return callback(true);

    if (userObj)
      callback(null, userObj);
    else
      callback(true);
  });

};

userSchema.statics.follow = function (userId, usernameToFollow, callback) {

  var User = require('./user_document');

  var alreadyFollow  = false,
      isYou          = false;

  async.waterfall([

    function (cb) {

      User.getByUsername(usernameToFollow, function (err, userObj) {
        if (err)
          cb(new Error('User Don\'t Exist'));
        else
          cb(null, userObj._id);
      });

    },

    function (userIdToFollow, cb) {

      User.getById(userId, function (err, userObj) {
        if (err)
          cb(new Error('User Don\'t Exist'));
        else
          cb(null, userIdToFollow, userObj.following.list);
      });

    },

    function (userIdToFollow, userFollowingList, cb) {

      _.each(userFollowingList, function (userIdFollowing) {
        if (String(userIdFollowing) === String(userIdToFollow))
          alreadyFollow = true;
      });

      if (String(userId) === String(userIdToFollow))
        isYou = true;

      if (alreadyFollow || isYou)
        return cb(new Error('already Follow'));

      async.parallel([

        function (cb) {
          User.findByIdAndUpdate(userId, { $addToSet: { 'following.list': userIdToFollow }, $inc: { 'following.count': 1} }, {}, function (err) {
            if (err) cb(err);
            cb();
          });
        },

        function (cb) {
          User.findByIdAndUpdate(userIdToFollow, { $addToSet: { 'followers.list': userId }, $inc: { 'followers.count': 1} }, {}, function (err) {
            if (err) cb(err);
            cb();
          });

        }
      ], function (err) {
        if (err)
          cb(err);
        else
          cb();
      });

    }], function (err, res) {
      if (err)
        callback(err);
      else
        callback(null, null);
    })

};

userSchema.statics.unfollow = function (userId, usernameToUnfollow, callback) {

  var User = require('./user_document');

  var alreadyUnfollow = false,
      isYou           = false;

  async.waterfall([

    function (cb) {

      User.getByUsername(usernameToUnfollow, function (err, userObj) {
        if (err)
          cb(new Error('User Don\'t Exist'));
        else
          cb(null, userObj._id);
      });

    },

    function (userIdToUnfollow, cb) {

      User.getById(userId, function (err, userObj) {
        if (err)
          cb(new Error('User Don\'t Exist'));
        else
          cb(null, userIdToUnfollow, userObj.following.list);
      });

    },

    function (userIdToUnfollow, userFollowingList, cb) {

      _.each(userFollowingList, function (userIdFollowing) {
        if (String(userIdFollowing) === String(userIdToUnfollow))
          alreadyUnfollow = true;
      });

      if (String(userId) === String(userIdToUnfollow))
        isYou = true;

      if (!alreadyUnfollow || isYou)
        return cb(new Error('already Unfollow'));

      async.parallel([

        function (cb) {
          User.findByIdAndUpdate(userId, { $unset: { 'following.list': userIdToUnfollow }, $inc: { 'following.count': -1} }, {}, function (err) {
            if (err) cb(err);
            cb();
          });
        },

        function (cb) {
          User.findByIdAndUpdate(userIdToUnfollow, { $unset: { 'followers.list': userId }, $inc: { 'followers.count': -1} }, {}, function (err) {
            if (err) cb(err);
            cb();
          });

        }
      ], function (err) {
        if (err)
          cb(err);
        else
          cb();
      });

    }], function (err, res) {
      if (err)
        callback(err);
      else
        callback(null, null);
    })

};

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

userSchema.statics.mapToClient = function () {

  var args                     = Array.prototype.slice.call(arguments),
      callback                 = typeof args[args.length - 1] === 'function' ? args.pop() : undefined,
      user                     = args.shift(),
      sessionId                = args.shift();

  var userMapped               = {};


  userMapped.id                = user._id,
  userMapped.username          = user.username,
  userMapped.description       = user.description,
  userMapped.creation_date     = user.creation_date;


  userMapped.followers         = {},
  userMapped.followers.count   = user.followers.count;

  userMapped.following         = {},
  userMapped.following.count   = user.following.count;

  userMapped.stories           = {},
  userMapped.stories.count     = user.stories.count;



  async.parallel(
    {
      storiesList: function (callback) {
        async.map(user.stories.list,

          function (userStoryId, cb) {

            Story.get(userStoryId, function (err, userStory) {
              if (err)
                cb(err, null);
              else
                cb(null, userStory);
            });
          },
          function (err, userStoriesObj) {
            if (err)
              callback(err);
            else
              callback(null, userStoriesObj);
          }
        );
      },

      isCurrentUser: function (callback) {

        if (userHelper.isCurrentUser(userMapped.id, sessionId))
          callback(null, true);
        else
          callback(null, false);

      },

      isFollow: function (callback) {

        var User      = require('./user_document'),
            isFollow  = false;

        if (!sessionId || String(sessionId) === String(userMapped.id))
          return callback(null, null);

        User.getById(sessionId, function (err, userObj) {

          if (err) return callback(err);

          _.each(userObj.following.list, function (userIdFollowing) {
            if (String(userIdFollowing) === String(userMapped.id))
              isFollow = true;
          });

          callback(null, isFollow);

        });

      }
    },

    function (err, results) {
      if (err)
        callback(err);

      userMapped.stories.list  = results.storiesList;
      userMapped.isCurrentUser = results.isCurrentUser;

      if (!_.isNull(results.isFollow))
        userMapped.isFollow    = results.isFollow;

      callback(null, userMapped);
    }
  );

}

module.exports = mongoose.model('user', userSchema);
