var Dispatcher      = require('flux').Dispatcher,
    assign          = require('object-assign');


var AppDispatcher = assign(new Dispatcher(), {

  handleServerAction: function (action) {
    this.dispatch({
      type    : 'SERVER_ACTION',
      action  : action
    });
  },

  handleViewAction: function (action) {
    this.dispatch({
      type    : 'CLIENT_ACTION',
      action  : action
    });
  }

});

module.exports = AppDispatcher;
