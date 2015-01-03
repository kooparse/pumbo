var AppDispatcher = require('../dispatchers/appDispatcher'),
    ActionType    = require('../constants/collectionConstants');


module.exports = {

  create: function (userId, dataForm) {
    AppDispatcher.handleViewAction({
      type      : ActionType.CREATE_COLLECTION,
      data      : {
        userId    : userId,
        dataForm  : dataForm
      }
    });
  },

  get: function (dataForm) {
    AppDispatcher.handleViewAction({
      type      : ActionType.GET,
      dataForm  : dataForm
    });
  }

};
