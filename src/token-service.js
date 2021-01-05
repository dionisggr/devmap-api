const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('./config');

const TokenService = {
  create(subject, payload) {
    return jwt.sign(payload, JWT_SECRET, {
      subject, expiresIn: JWT_EXPIRY, algorithm: 'HS256'
    });
  }
  ,
  verify(token) {
    return jwt.verify(token, JWT_SECRET, {algorithms: ['HS256']});
  }
};

module.exports = TokenService;