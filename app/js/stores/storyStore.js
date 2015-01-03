var _               = require('underscore'),
    AppDispatcher   = require('../dispatchers/appDispatcher'),
    storyConstants  = require('../constants/storyConstants'),
    CurrentUser     = require('../libs/current_user'),

    EventEmitter    = require('events').EventEmitter,
    assign          = require('object-assign'),
    request         = require('superagent');

var StoryActionTypes   = storyConstants,
    CHANGE_EVENT  = 'change';


var _storyObj,
    _storyList;


var _createStory = function (username, dataForm, callback) {

    request.post('/api/v1/users/' + username + '/story', dataForm, function (err, res) {
      if (err)
        callback(err);
      else
        callback();
    });

};

var _getFeed = function (userId, callback) {

  request.get('/api/v1/users/' + userId + '/feed', function (err, res) {
    if (err)
      return err;

    _storyList = res.body;
    callback();
  });

};

/* STORE CONSTRUCTOR */

var StoryStore = assign({}, EventEmitter.prototype, {

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getFeed: function () {
    return _storyList;
  },


  dispatcherIndex: AppDispatcher.register(function (payload) {

    var action = payload.action;


    switch(action.type) {

      case StoryActionTypes.CREATE_STORY:
        _createStory(payload.action.data.username, payload.action.data.dataForm, function () {
          StoryStore.emitChange();
        });
        break;

      case StoryActionTypes.GET_FEED:
        _getFeed(payload.action.data.userId, function () {
          StoryStore.emitChange();
        });
        break;

      default:
        // do fucking nothing
    }

    return true;
  })

});

module.exports = StoryStore;
