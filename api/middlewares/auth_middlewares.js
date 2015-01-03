
'use strict';

exports._middleware_ensureAuthenticated = function (req, res, next) {

  if (req.isAuthenticated()) return next();
  res.sendStatus(401);

};
