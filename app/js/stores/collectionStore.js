var _                     = require('underscore'),
    AppDispatcher         = require('../dispatchers/appDispatcher'),
    collectionConstants   = require('../constants/collectionConstants'),
    CurrentUser           = require('../libs/current_user'),

    EventEmitter          = require('events').EventEmitter,
    assign                = require('object-assign'),
    request               = require('superagent');

var CollectionActionTypes = collectionConstants,
    CHANGE_EVENT          = 'change';


var _collectionObj;


var _create = function (userId, dataForm, callback) {
    request.post('/api/v1/users/' + userId + '/collection', dataForm, function (err, res) {
      if (err)
        callback(err);
      else
        callback();
    });

};

var _get = function (collectionId, callback) {

};

/* STORE CONSTRUCTOR */

var CollectionStore = assign({}, EventEmitter.prototype, {

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: function () {
    return _collectionObj;
  },


  dispatcherIndex: AppDispatcher.register(function (payload) {

    var action = payload.action;


    switch(action.type) {

      case CollectionActionTypes.CREATE_COLLECTION:
        _create(payload.action.data.userId, payload.action.data.dataForm, function () {
          CollectionStore.emitChange();
        });
        break;

      case CollectionActionTypes.GET:
        _get(payload.action.data.collectionId, function () {
          CollectionStore.emitChange();
        });
        break;

      default:
        return true;
    }

    return true;
  })

});

module.exports = CollectionStore;
