var AppDispatcher = require('../dispatchers/appDispatcher'),
    ActionType    = require('../constants/storyConstants');


module.exports = {

  createStory: function (username, dataForm) {
    AppDispatcher.handleViewAction({
      type  : ActionType.CREATE_STORY,
      data  : {
        username  : username,
        dataForm  : dataForm
      }
    });
  },

  getFeed: function (userId) {
    AppDispatcher.handleViewAction({
      type  : ActionType.GET_FEED,
      data  : { userId: userId }
    });
  }

};
