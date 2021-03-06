const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { API_KEY, JWT_SECRET } = require('../config');
const UsersService = require('../services/users-service');

const validation = {
  async authentication(req, res, next) {
    const db = req.app.get('db');
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(401).send({error: 'Invalid access.'});
    };

    const user = await UsersService.getByUsername(db, username)
      .catch(next);
    
    if (!user) {
      return res.status(401).send({ error: 'Invalid: username' });
    };
    
    const passwordsMatch = bcrypt.compare(user.password, password)
      .catch(next);
    
    if (!passwordsMatch) {
      return res.status(401).send({ error: 'Invalid: password' });
    };

    if (user.admin) {
      req.apiKey = API_KEY;
    };

    req.user_id = user.user_id;

    next();
  }
  ,
  authorization(req, res, next) {
    const auth = req.get('Authorization');
    const token = (auth) ? auth.split(' ')[1] : null;

    if (token === API_KEY) {
      req.token = token;
      
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