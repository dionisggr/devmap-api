const express = require('express');
const IssuesService = require('../services/issues-service');
const { authorization } = require('../middleware/validation');
const xss = require('xss');

const IssuesRouter = express.Router();

IssuesRouter.route('/api/issues')
  .get(async (req, res, next) => {
    const db = req.app.get('db');

    const issues = await IssuesService.getIssues(db)
      .catch(next);
    
    return res.json(issues);
  })
  .post(authorization, async (req, res, next) => {
    const db = req.app.get('db');
    const {
      name, description, project_id,
      phase, status, github
    } = req.body;

    const issue = {
      name, description, project_id,
      phase, status, github
    };

    for (const [key, value] of Object.entries(issue)) {
      if ( !value && (key !== 'description' || key !== 'github') ) {
        return res.status(400).send({ error: 'Missing values.' });
      }
      
      if (typeof value === 'string') {
        issue[key] = xss(value);
      };
    };

    const newIssue = await IssuesService.addIssue(db, issue)
      .catch(next);
    
    return res.status(201).json(newIssue);
  });

IssuesRouter.route('/api/issues/:id')
  .all(authorization, async (req, res, next) => {
    const db = req.app.get('db');
    const issue_id = parseInt(req.params.id);

    const issue = await IssuesService.getById(db, issue_id)
      .catch(next);
    
    req.issue = issue;
    
    next();
  })
  .get((req, res) => {
    return res.json(req.issue);
  })
  .patch(async (req, res, next) => {
    const db = req.app.get('db');
    const { name, description, phase, status, github } = req.body;
    const { issue_id } = req.issue;

    const values = { name, description, phase, status, github };

    for (const [key, value] of Object.entries(values)) {
      if ( !value) {
        delete values[key];
      };
      
      if (typeof value === 'string') {
        values[key] = xss(value);
      };
    };

    const editedIssue = await IssuesService.editIssue(db, issue_id, values)
      .catch(next);
    
    return res.json(editedIssue);    
  })
  .delete(async (req, res, next) => {
    const db = req.app.get('db');
    const { issue_id } = req.issue;
    
    await IssuesService.deleteIssue(db, issue_id)
      .catch(next);
    
    return res.status(301).end();
  });

module.exports = IssuesRouter;