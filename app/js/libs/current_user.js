var underscore = require('underscore'),
    request    = require('superagent'),
    cookie     = require('cookies-js');



exports.id = function () {
  var _value = cookie.get('current_user');
  return cookie.get('current_user');
};

exports.remove = function () {
  cookie.expire('current_user');
};

exports.logout = function () {
  request.post('/api/v1/auth/logout', {}, function (err, res) {
    if (!err) location.reload();
  });
};
