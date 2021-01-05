const { API_KEY, JWT_SECRET } = require('./config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UsersService = require('./users-service');
const TokenService = require('./token-service');

const validation = {
  authentication(req, res, next) {
    const db = req.app.get('db');
    const auth = req.get('Authorization');
    const { username, password } = req.body;
    const token = (auth) ? auth.split(' ')[1] : null;
    if (!username || !password) {
      if (!auth || !token) {
        return res.status(401).send({error: 'Invalid access.'});
      };
    };
    if (token !== API_KEY) {
      UsersService.getByUsername(db, username)
        .then(user => {
          if (!user) {
            return res.status(401).send({error: 'Invalid credentials.'});
          };
          bcrypt.compare(password, user.password)
            .then(match => {
              if (!match) {
                return res.status(401).send({error: 'Invalid credentials.'})
              };
              next();
            });
        });
    } else next();
  }
  ,
  authorization(req, res, next) {
    const auth = req.get('Authorization');
    const token = (auth) ? auth.split(' ')[1] : null;
    try {
      if (token !== API_KEY) {
        jwt.verify(token, JWT_SECRET, {
          algorithms: ['HS256']
        });
      };
      next();
    } catch(e) {
      return res.status(401).send({error: 'Unauthorized access.'});
    };
  }
};

module.exports = validation;