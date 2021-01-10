const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { API_KEY, JWT_SECRET } = require('../config');
const UsersService = require('../services/users-service');

const validation = {
  authentication(req, res, next) {
    const db = req.app.get('db');
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(401).send({error: 'Invalid access.'});
    };
    UsersService.getByUsername(db, username)
      .then(user => {
        if (!user) {
          return res.status(401).send({error: 'Invalid: username'});
        } else {
          req.body.id = user.user_id;
          bcrypt.compare(password, user.password)
            .then(match => {
              if (!match) {
                return res.status(401).send({error: 'Invalid: password'})
              } else {
                if (user.role === 'Admin') req.apiKey = API_KEY
                next();
              };
            });
        };
      });
  }
  ,
  authorization(req, res, next) {
    const auth = req.get('Authorization');
    const token = (auth) ? auth.split(' ')[1] : null;
    if (token === API_KEY) {
      req.token = API_KEY;
      next();
    } else {
      try {
        jwt.verify(token, JWT_SECRET, {
          algorithms: ['HS256']
        });
        req.token = token;
        next();
      } catch(e) {
        return res.status(401).send({error: 'Unauthorized access.'});
      };
    };
  }
};

module.exports = validation;