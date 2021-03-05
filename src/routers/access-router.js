const express = require('express');
const jwt_decode = require('jwt-decode');
const { authentication, authorization } = require('../../helpers/validation');
const { API_KEY } = require('../../config');
const TokenService = require('../../services/token-service');
const UsersService = require('../../services/users-service');

const AccessRouter = express.Router();

AccessRouter.route('/login')
  .post(authentication, (req, res) => {
    const { username, id } = req.body;
    if (req.apiKey) {
      return res.json({ apiKey: req.apiKey, user: {id, username} })
    } else {
      const authToken = TokenService.create(username, {userID: id});
      return res.json({ authToken, user: {id, username} });
    }
  });

AccessRouter.route('/refresh')
  .get(authorization, (req, res) => {
    const db = req.app.get('db');
    const token = req.token;
    if (token === API_KEY) {
      return res.json({ authToken: API_KEY });
    } else {
      const subject = (token) ? jwt_decode(token).sub : null;
      UsersService.getByUsername(db, subject)
        .then(user => {
          const payload = {userID: user.user_id};
          try {
            TokenService.verify(token)
            const authToken = TokenService.create(subject, payload);
            return res.json({ authToken });
          } catch(e) {
            return res.status(401).send({error: 'Unauthorized access.'});
          }
        });
    };
  });

module.exports = AccessRouter;