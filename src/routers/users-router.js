const express = require('express');
const bcrypt = require('bcryptjs');
const xss = require('xss');
const { authorization } = require('../middleware/validation');
const UsersService = require('../services/users-service');

const UsersRouter = express.Router();

UsersRouter.route('/api/users')
  .get(authorization, async (req, res, next) => {
    const db = req.app.get('db');

    const users = await UsersService.getUsers(db)
      .catch(next);
    
    users.forEach(user => delete user.password);

    return res.json(users);
  })
  .post(async (req, res, next) => {
    const db = req.app.get('db');
    const {
      username, first_name, last_name,
      email, github, password } = req.body;
    
    const user = {
      username, first_name, last_name,
      email, github, password
    };

    for (const [key, value] of Object.entries(user)) {
      if (key !== 'github' && !value) {
        return res.status(400).send({ error: 'Missing values.' });
      }
      
      if (typeof value === 'string') {
        user[key] = xss(value);
      };
    };

    user.password = bcrypt.hash(user.password, 8)
      .catch(next);
    
    const newUser = await UsersService.addUser(db, user)
      .catch(next);
    
    req.body.username = newUser.username;
    req.body.password = newUser.password;

    return res.redirect(307, '/login');
  });


UsersRouter.route('/api/users/:id')
  .all(authorization, async (req, res, next) => {
    const db = req.app.get('db');
    const user_id = req.params.id;

    const user = await UsersService.getById(db, user_id)
      .catch(next);
    
    if (!user) {
      return next({ message: 'Invalid data.' });
    };

    delete user.password;

    req.user = user;

    next();
  })
  .get((req, res) => {

    return res.json(req.user);

  })
  .patch(async (req, res, next) => {
    const db = req.app.get('db');
    const { user_id } = req.user;

    const {
      username, firstName, lastName, email, github
    } = req.body;

    const values = { username, firstName, lastName, email, github };

    for (const [key, value] of Object.entries(values)) {
      if (!value) {
        delete values[key];
      };
    };

    const editedUser = await UsersService.editUser(db, user_id, values)
      .catch(error => {
        if (error.detail.includes('username')) {
          return res.status(400).send({ error: 'Username taken.'})
        } else if (error.detail.includes('email')) {
          return res.status(400).send({ error: 'Email taken.'})
        } else {
          return res.json({ error });
        }
      });
    
    delete editedUser.password;

    return res.status(201).send(editedUser);
  })
  .delete(async (req, res, next) => {
    const db = req.app.get('db');
    const { user_id } = req.user;

    await UsersService.deleteUser(db, user_id)
      .catch(next);
    
    return res.status(301).end();
  });


UsersRouter.route('/api/usernames')
  .get(async (req, res, next) => {
    const db = req.app.get('db');
    
    const usernames = await UsersService.getUsernames(db)
      .catch(next);
    
    return res.json(usernames);
  });

UsersRouter.route('/api/usernames/:username')
  .get(async (req, res, next) => {
    const db = req.app.get('db');
    const { username } = req.params;

    const user = await UsersService.getByUsername(db, username)
      .catch(next)
    
    delete user.password;

    if (!user) {
      return res.status(400).send({ error: 'Invalid data.' });
    };

    return res.json(user);
  });

module.exports = UsersRouter;