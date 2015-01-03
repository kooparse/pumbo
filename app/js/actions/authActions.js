var AppDispatcher = require('../dispatchers/appDispatcher'),
    ActionType    = require('../constants/authConstants');


module.exports = {

  signUp: function (dataForm) {
    AppDispatcher.handleViewAction({
      type      : ActionType.SIGN_UP,
      dataForm  : dataForm
    });
  },

  signIn: function (dataForm) {
    AppDispatcher.handleViewAction({
      type      : ActionType.SIGN_IN,
      dataForm  : dataForm
    });
  }

};
