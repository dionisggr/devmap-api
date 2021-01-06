const express = require('express');
const UsersService = require('./users-service');
const UsersRouter = express.Router();
const xss = require('xss');
const { authorization } = require('./validation');

UsersRouter.route('/api/users')
  .get(authorization, (req, res) => {
    const db = req.app.get('db');
    UsersService.getUsers(db)
      .then(users => {
        users = users.map(user => {
          user.id = user.user_id.toString();
          user.startDate = user.start_date;
          user = {
            id: user.id, username: xss(user.username), firstName: xss(user.first_name),
            lastName: xss(user.last_name), email: xss(user.email), 
            tools: xss(user.tools), startDate: xss(user.startDate),
            github: xss(user.github), role: xss(user.role)
          };
          delete user.user_id;
          delete user.start_date;
          return user;
        });
        return res.json(users);
      });
  })
  .post((req, res, next) => {
    const db = req.app.get('db');
    const {
      username, firstName, lastName, email, 
      tools, github, password
    } = req.body;
    const newUser = {
      username: xss(username), first_name: xss(firstName),
      last_name: xss(lastName), email: xss(email), 
      tools: xss(tools), github: xss(github), password: xss(password)
    };
    Object.entries(newUser).forEach(([key, value]) => {
      if (key === 'tools' || key === 'github' || key === 'start_date') return;
      if (!value) next({message: 'Missing values.'});
    });
    UsersService.addUser(db, newUser)
      .then(user => {
        req.username = xss(user.username);
        req.password = xss(user.password);
        user = {
          id: user.user_id, username: req.username, firstName: xss(user.first_name),
          lastName: xss(user.last_name), email: xss(user.email), 
          tools: xss(user.tools), startDate: xss(user.start_date),
          github: xss(user.github), role: xss(user.role)
        };
        delete user.password;
        return res.redirect(307, '/login');
      })
      .catch(error => {
        error = error.detail.split('Key ')[1];
        return res.status(401).send({ error });
      });
  });

UsersRouter.route('/api/users/:userID')
  .all(authorization, (req, res, next) => {
    const db = req.app.get('db');
    res.id = req.params.userID;
    UsersService.getById(db, res.id)
      .then(user => {
        if (!user) next({message: 'Invalid data.'});
        res.user = user;
        next();
      });
  })
  .get((req, res) => {
    const db = req.app.get('db');
    const user = {
      id: res.user.user_id, username: xss(res.user.username),
      firstName: xss(res.user.first_name),
      lastName: xss(res.user.last_name), email: xss(res.user.email), 
      tools: xss(res.user.tools), startDate: xss(res.user.start_date),
      github: xss(res.user.github), role: xss(res.user.role)
    };
    return res.json(user);
  })
  .patch((req, res, next) => {
    const db = req.app.get('db');
    const {
      username, firstName, lastName, email, 
      tools, startDate, github, role
    } = req.body;
    const user = {
      user_id: parseInt(res.id), username: xss(username), first_name: xss(firstName),
      last_name: xss(lastName), email: xss(email), 
      tools: xss(tools), start_date: xss(startDate),
      github: xss(github), role: xss(role)
    };
    Object.entries(user).forEach(([key, value]) => {
      if (key === 'tools' || key === 'github') return;
      if (!value) next({message: 'Missing values.'});
    });
    UsersService.editUser(db, res.id, user)
      .then(user => {
        return res.status(201).json(user);
      });
  })
  .delete((req, res) => {
    const db = req.app.get('db');
    UsersService.deleteUser(db, res.id)
      .then(() => res.status(301).end());
  });

module.exports = UsersRouter;