var AppDispatcher   = require('../dispatchers/appDispatcher'),
    AuthConstants   = require('../constants/authConstants'),
    EventEmitter    = require('events').EventEmitter,
    assign          = require('object-assign'),
    request         = require('superagent');

var AuthActionTypes   = AuthConstants,
    CHANGE_EVENT      = 'change';


var _userObj;

var _signUp = function (dataForm, callback) {

  request.post('/api/v1/auth/signup', dataForm, function (err, res) {
    if (!err && res) {
      _userObj = res.body;
      callback();
    }
  });

};

var _signIn = function (dataForm, callback) {

  request.post('/api/v1/auth/login', dataForm, function (err, res) {
    if (!err && res) {
      _userObj = res.body;
      callback();
    }
  });

};


/* STORE CONSTRUCTOR */

var AuthStore = assign({}, EventEmitter.prototype, {

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getUserObj: function () {
    return _userObj;
  },


  dispatcherIndex: AppDispatcher.register(function (payload) {

    var action = payload.action;


    switch(action.type) {

      case AuthActionTypes.SIGN_UP:
        _signUp(payload.action.dataForm, function () {
            AuthStore.emitChange();
        });
        break;

      case AuthActionTypes.SIGN_IN:
        _signIn(payload.action.dataForm, function () {
          AuthStore.emitChange();
        });
        break;

      default:
        // do fucking nothing
    }

    return true;
  })

});

module.exports = AuthStore;
