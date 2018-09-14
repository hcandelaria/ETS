const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../../config');


/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {

  const path = req.path.split('/');

  if (!req.headers.authorization && path[1] != 'store') {
    return res.status(401).end();
  }

  if(path[1] == 'store'){
    return User.find({store: path[2]}, function(req, res){
      console.log(res);
      return next();
    })
  }
  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }

    const userId = decoded.sub;

    // check if a user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }

      return next();
    });
  });
};
