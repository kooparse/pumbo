var AppDispatcher = require('../dispatchers/appDispatcher'),
    ActionType    = require('../constants/userConstants');


module.exports = {

  getUser: function (username) {
    AppDispatcher.handleViewAction({
      type      : ActionType.GET_USER,
      username  : username
    });
  },

  follow: function (username) {
    AppDispatcher.handleViewAction({
      type      : ActionType.FOLLOW,
      username  : username
    });
  },

  unfollow: function (username) {
    AppDispatcher.handleViewAction({
      type      : ActionType.UNFOLLOW,
      username  : username
    });
  },

};
