const express = require('express');
const { authentication, authorization } = require('./validation');
const AccessRouter = express.Router();
const TokenService = require('./token-service');
const UsersService = require('./users-service');
const base64url = require('base64url');
const { API_KEY } = require('./config');

AccessRouter.route('/login')
  .post(authentication, (req, res) => {
    const { username, id } = req.body;
    if (req.apiKey) {
      return res.json({apiKey: req.apiKey})
    } else {
      const authToken = TokenService.create(username, {userID: id});
      return res.json({ authToken });
    }
  });

AccessRouter.route('/refresh')
  .post(authorization, (req, res) => {
    const db = req.app.get('db');
    let previous = req.get('Authorization');
    previous = (previous) ? previous.split(' ')[1] : null;
    let subject = JSON.parse(base64url.decode(previous.split('.')[1])).sub;
    UsersService.getByUsername(db, subject)
      .then(user => {
        const payload = {userID: user.user_id};
        try {
          TokenService.verify(previous)
          const authToken = TokenService.create(subject, payload);
          return res.json({ authToken });
        } catch(e) {
          return res.status(401).send({error: 'Unauthorized access.'});
        }
      });
  });

module.exports = AccessRouter;