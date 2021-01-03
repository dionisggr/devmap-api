const express = require('express');
const UsersService = require('./users-service');
const UsersRouter = express.Router();
const xss = require('xss');

UsersRouter.route('/users')
  .all((req, res, next) => {
    next();
  })
  .get((req, res) => {
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
            github: xss(user.github), logged: user.logged
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
      tools, startDate, github, logged
    } = req.body;
    const newUser = {
      username: xss(username), first_name: xss(firstName),
      last_name: xss(lastName), email: xss(email), 
      tools: xss(tools), start_date: xss(startDate),
      github: xss(github), logged
    };
    Object.entries(newUser).forEach(([key, value]) => {
      if (key === 'tools' || key === 'github' || key === 'start_date' || (key === 'logged' && !value)) return;
      if (!value) next({message: 'Missing values.'});
    });
    UsersService.addUser(db, newUser)
      .then(user => {
        user = {
          id: user.user_id, username: xss(user.username), firstName: xss(user.first_name),
          lastName: xss(user.last_name), email: xss(user.email), 
          tools: xss(user.tools), startDate: xss(user.start_date),
          github: xss(user.github), logged: user.logged
        };
        return res.status(201).json(user);
      });
  });

UsersRouter.route('/users/:userID')
  .all((req, res, next) => {
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
      github: xss(res.user.github), logged: res.user.logged
    };
    return res.json(user);
  })
  .patch((req, res, next) => {
    const db = req.app.get('db');
    const {
      username, firstName, lastName, email, 
      tools, startDate, github, logged
    } = req.body;
    const user = {
      user_id: parseInt(res.id), username: xss(username), first_name: xss(firstName),
      last_name: xss(lastName), email: xss(email), 
      tools: xss(tools), start_date: xss(startDate),
      github: xss(github), logged
    };
    Object.entries(user).forEach(([key, value]) => {
      if (key === 'tools' || key === 'github' || (key === 'logged' && !value)) return;
      if (!value) console.log(key) && next({message: 'Missing values.'});
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