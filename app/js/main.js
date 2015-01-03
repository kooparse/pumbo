/** @jsx React.DOM */

var React           = require('react'),
    Router          = require('react-router'),
    RouteHandler    = Router.RouteHandler,

    Topbar          = require('./components/topbarComponents.react.jsx'),

    routes          = require('./routes.jsx');

window.React = React;


Router.run(routes, Router.HistoryLocation, function (Handler, state) {
  React.render(
    <Handler params={state.params} query={state.query}/>,
    document.getElementById('app-container')
  );
});
