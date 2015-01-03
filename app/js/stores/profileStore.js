var AppDispatcher     = require('../dispatchers/appDispatcher'),
    ProfileConstants  = require('../constants/profileConstants'),
    CurrentUser       = require('../libs/current_user'),

    EventEmitter      = require('events').EventEmitter,
    assign            = require('object-assign'),
    request           = require('superagent');

var ProfileActionTypes = ProfileConstants,
    CHANGE_EVENT       = 'change';


var _profileObj;

var _get = function (userId, callback) {

  request.get('/api/v1/users/' + userId, function (err, res) {

    if (res.status !== 200) {
      callback({status: res.status, errorMessage: res.text}, null);
    }
    else {
      _profileObj = res.body;
      callback();
    }

  });

};

/* STORE CONSTRUCTOR */

var ProfileStore = assign({}, EventEmitter.prototype, {

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getProfile: function () {
    return _profileObj;
  },


  dispatcherIndex: AppDispatcher.register(function (payload) {

    var action = payload.action;


    switch(action.type) {

      case ProfileActionTypes.GET_PROFILE:
        _get(payload.action.userId, function () {
          ProfileStore.emitChange();
        });
        break;

      default:
        return true;
    }

    return true;

  })

});

module.exports = ProfileStore;
