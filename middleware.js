let jwt = require('jsonwebtoken');
const config = require('./config.js');

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if(typeof token !== 'undefined'){
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
  
    if (token) {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.status(400).json({
            success: false,
            message: 'Token is not valid'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Auth token is not supplied'
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: 'Not Authorized Access'
    });
  }
};

module.exports = {
  checkToken: checkToken
}
