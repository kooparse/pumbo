
'use strict';

exports.isCurrentUser = function (userId, sessionId) {

  if (!userId || !sessionId) return false;


  if (String(userId) === String(sessionId))
    return true;
  else
    return false;

};
