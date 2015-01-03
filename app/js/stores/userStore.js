var AppDispatcher     = require('../dispatchers/appDispatcher'),
    StoryStore        = require('./storyStore'),
    UserConstants     = require('../constants/userConstants'),
    StoryConstants    = require('../constants/storyConstants'),
    CurrentUser       = require('../libs/current_user'),

    EventEmitter      = require('events').EventEmitter,
    assign            = require('object-assign'),
    request           = require('superagent');

var UserActionTypes   = UserConstants,
    StoryActionTypes  = StoryConstants,
    CHANGE_EVENT      = 'change';


var _userObj;

var _get = function (username, callback) {

  request.get('/api/v1/users/' + username, function (err, res) {

    if (res.status !== 200) {
      callback({status: res.status, errorMessage: res.text}, null);
    }
    else {
      _userObj = res.body;
      callback();
    }

  });

};

var _follow = function (username, callback) {

  request.post('/api/v1/users/' + username + '/follow', {}, function (err, res) {

    if (res.status !== 200) {
      callback({status: res.status, errorMessage: res.text}, null);
    }
    else {
      _get(username, function (err, res) {
        if (!err) callback();
      });
    }

  });

};

var _unfollow = function (username, callback) {

  request.post('/api/v1/users/' + username + '/unfollow', {}, function (err, res) {

    if (res.status !== 200) {
      callback({status: res.status, errorMessage: res.text}, null);
    }
    else {
      _get(username, function (err, res) {
        if (!err) callback();
      });
    }

  });

};

/* STORE CONSTRUCTOR */

var UserStore = assign({}, EventEmitter.prototype, {

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getUser: function () {
    return _userObj;
  },


  dispatcherIndex: AppDispatcher.register(function (payload) {

    var action = payload.action;


    switch(action.type) {

      case StoryActionTypes.CREATE_STORY:
        AppDispatcher.waitFor([StoryStore.dispatcherIndex]);
        _get(payload.action.data.username, function () {
          UserStore.emitChange();
        });
        break;

      case UserActionTypes.GET_USER:
        _get(payload.action.username, function () {
          UserStore.emitChange();
        });
        break;

      case UserActionTypes.FOLLOW:
        _follow(payload.action.username, function () {
          UserStore.emitChange();
        });
        break;

      case UserActionTypes.UNFOLLOW:
        _unfollow(payload.action.username, function () {
          UserStore.emitChange();
        });
        break;

      default:
        return true;
    }

    return true;

  })

});

module.exports = UserStore;
