const express = require('express');
const UsersService = require('./users-service');
const UsersRouter = express.Router();
const bcrypt = require('bcryptjs');
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
      })
      .catch(error => next({ error }));
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
    bcrypt.hash(newUser.password, 8)
      .then(password => {
        newUser.password = password;
        UsersService.addUser(db, newUser)
          .then(user => {
            req.body.username = xss(user.username);
            req.body.password = xss(user.password);
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
      })
      .catch(error => next({ error }));

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
      })
      .catch(error => next({ error }));
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
    const id = req.params.userID;
    const {
      username, firstName, lastName, email, 
      tools, startDate, github
    } = req.body;
    const user = {
     username: xss(username), first_name: xss(firstName),
      last_name: xss(lastName), email: xss(email), 
      tools: xss(tools), start_date: xss(startDate),
      github: xss(github)
    };
    Object.entries(user).forEach(([key, value]) => {
      if (key === 'tools' || key === 'github') return;
      if (!value) next({message: 'Missing values.'});
    });
    delete user.start_date;
    UsersService.editUser(db, id, user)
      .then(user => {
        delete user.password; 
        return res.status(201).send(user);
      })
      .catch(error => res.status(400).send({ error }));
  })
  .delete((req, res) => {
    const { userID } = req.params;
    const db = req.app.get('db');
    UsersService.deleteUser(db, userID)
      .then(() => res.status(301).end())
      .catch(error => next({ error }));
  });

UsersRouter.route('/api/usernames')
  .get((req, res) => {
    const db = req.app.get('db');
    UsersService.getUsernames(db)
      .then(usernames => {
        return res.json(usernames);
      })
      .catch(error => res.status(400).send({ error }));
  });

UsersRouter.route('/api/:username')
  .get((req, res) => {
    const username = req.params.username;
    UsersService.getByUsername(username)
      .then(user => {
        if (!res) res.status(400).send({ error: 'Invalid data.'})
        return res.json(user);
      })
      .catch(error => next({ error }));
  });

module.exports = UsersRouter;