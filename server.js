var express           = require('express'),
    passport          = require('passport'),

    bodyParser        = require('body-parser'),
    cookieParser      = require('cookie-parser'),
    session           = require('express-session'),

    isAuthenticated   = require('./api/middlewares/auth_middlewares')._middleware_ensureAuthenticated,

    app               = express();


var redis       = require("redis"),
    redisStore  = require('connect-redis')(session),
    client      = redis.createClient();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser('secret'));

app.use(session({
  secret: 'Stay Hungry Stay Foolish',
  store: new redisStore({ host: 'localhost', port: 6379, client: client }),
  saveUninitialized: false,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/js/bundle.js", express.static(__dirname + '/app/js/bundle.js'));
app.use("/style", express.static(__dirname + '/app/style/stylesheets/css/'));



/* API */

app.post(   '/api/v1/auth/signup'                    , require('./api/controllers/users_controller')._post_signup_user);
app.post(   '/api/v1/auth/login'                     , require('./api/controllers/users_controller')._post_login_user);
app.post(   '/api/v1/auth/logout'                    , require('./api/controllers/users_controller')._post_logout_user);


app.post(   '/api/v1/users/:username/follow'     , isAuthenticated, require('./api/controllers/users_controller')._post_follow);
app.post(   '/api/v1/users/:username/unfollow'   , isAuthenticated, require('./api/controllers/users_controller')._post_unfollow);
app.post(   '/api/v1/users/:username/story'      , isAuthenticated, require('./api/controllers/stories_controller')._post_story);

app.post(   '/api/v1/users/:userId/collection'   , isAuthenticated, require('./api/controllers/collections_controller')._post_collection);

app.get(    '/api/v1/users/:user'                     , require('./api/controllers/users_controller')._get_user);
app.get(    '/api/v1/users/:userId/feed'              , require('./api/controllers/users_controller')._get_stories_feed);

/* render index */
app.use(function (req, res, next) {

  if (req.originalUrl === '/favicon.ico') return next();

  if (req.session.passport.user)
    res.cookie('current_user', req.session.passport.user, { signed: false });
  else
    res.clearCookie('current_user');

  res.sendFile(__dirname + '/app/index.html');

});


/* SSR */

// app.use(function (req, res, next) {
//
//
//
//
//   if (req.originalUrl === "/favicon.ico") return next();
//
//   Router.renderRoutesToString(routes, req.path, function (err, reason, string) {
//
//
//     var htmlString = '<!doctype html><html lang="en"><head>';
//         htmlString += '<meta charset="utf-8">';
//         htmlString += '<title>Dumbo</title>';
//         htmlString += '</head><body>' + string + '<script src="./app/js/bundle.js"></script></body></html>';
//         res.send(htmlString);
//
//   });
//
// });


app.listen(3000);
