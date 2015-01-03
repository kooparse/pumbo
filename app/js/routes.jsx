
var React             = require('react'),
    Router            = require('react-router'),
    homeComponents    = require('./components/homeComponents.react.jsx'),
    userSection       = require('./components/userSection/userComponents.react.jsx'),
    collectionSection = require('./components/collectionSection/collectionComponents.react.jsx'),
    loginComponents   = require('./components/loginComponents.react.jsx'),
    appComponents     = require('./components/appComponents.react.jsx');

var Route             = Router.Route,
    NotFoundRoute     = Router.NotFoundRoute,
    DefaultRoute      = Router.DefaultRoute,
    Link              = Router.Link;


var routes = (
  <Route name="home" path="/" handler={appComponents}>
    <Route name="login" handler={loginComponents}/>
    <Route name="user" path=":username" handler={userSection}/>
    <Route name="collection" path=":username/:collectionUrl" handler={collectionSection}/>
    <DefaultRoute handler={homeComponents}/>
  </Route>
);

module.exports = routes;
