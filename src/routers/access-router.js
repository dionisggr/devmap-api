const express = require('express');
const jwt_decode = require('jwt-decode');
const { authentication, authorization } = require('../middleware/validation');
const { API_KEY } = require('../config');
const TokenService = require('../services/token-service');
const UsersService = require('../services/users-service');

const AccessRouter = express.Router();

AccessRouter.route('/login')
  .post(authentication, (req, res) => {
    const { username } = req.body;
    const { apiKey, user_id } = req;

    if (apiKey) {

      return res.json({ apiKey, user: { user_id, username } });

    } else {
      const authToken = TokenService.create(username, { user_id });
      
      return res.json({ authToken, user: {user_id, username} });
    }
  });

AccessRouter.route('/refresh')
  .patch(authorization, async (req, res, next) => {
    const db = req.app.get('db');
    const token = req.token;

    if (token === API_KEY) {
      return res.json({ authToken: API_KEY });
    };
    
    const subject = (token) ? jwt_decode(token).sub : null;
    
    const { user_id, username } = await UsersService.getByUsername(db, subject)
      .catch(next);
    
    const payload = { user_id, username };

    try {
      await TokenService.verify(token);

      const authToken = await TokenService.create(subject, payload);
    
      return res.json({ authToken });
    } catch (error) {
      return res.status(400).send({ error: 'Unauthorized access.' });
    }
  });

module.exports = AccessRouter;