var AppDispatcher = require('../dispatchers/appDispatcher'),
    ActionType    = require('../constants/profileConstants');


module.exports = {

  getProfile: function (userId) {
    AppDispatcher.handleViewAction({
      type      : ActionType.GET_PROFILE,
      userId    : userId
    });
  },

};
