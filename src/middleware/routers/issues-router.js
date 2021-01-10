const express = require('express');
const checkValues = require('../../helpers/check-values')
const IssuesService = require('../../services/issues-service');
const { authorization } = require('../../helpers/validation');
const xss = require('xss');

const IssuesRouter = express.Router();

IssuesRouter.route('/api/issues')
  .all((req, res, next) => {
    res.db = req.app.get('db');
    next();
  })
  .get((req, res) => {
    IssuesService.getIssues(res.db)
      .then(issues => {
        issues = issues.map(issue => {
          issue = {
            issue_id: xss(issue.issue_id), name: xss(issue.name), description: xss(issue.description), 
            project_id: xss(issue.project_id), tools: xss(issue.tools), phase: xss(issue.phase),
            status: xss(issue.status), owner: xss(issue.owner), start_date: xss(issue.start_date), 
            collaboration: issue.collaboration, github: xss(issue.github)
          };
          issue.id = issue.issue_id.toString();
          issue.projectID = issue.project_id.toString();
          issue.startDate = issue.start_date;
          delete issue.issue_id;
          delete issue.project_id;
          delete issue.start_date;
          return issue;
        });
        return res.json(issues);
      });
  })
  .post(authorization, (req, res, next) => {
    const {
      name, description, project_id, tools, phase, 
      status, owner, start_date, collaboration, github
    } = req.body;
    const newIssue = {
      name: xss(name), description: xss(description), 
      project_id, tools: xss(tools), phase: xss(phase),
      status: xss(status), owner: owner, start_date, 
      collaboration: collaboration, github: xss(github)
    };
    Object.entries(newIssue).forEach(([key, value]) => {
      if (!value) next({message: 'Missing values.' + key});
    });
    checkValues(res.db, newIssue)
      .then(() => {
        IssuesService.addIssue(res.db, newIssue)
        .then(issue => {
          issue = {
            issue_id: issue.issue_id, name: xss(issue.name), description: xss(issue.description), 
            project_id: issue.project_id, tools: xss(issue.tools), phase: xss(issue.phase),
            status: xss(issue.status), owner: xss(issue.owner), start_date: xss(issue.start_date), 
            collaboration: issue.collaboration, github: xss(issue.github)
          };
          return res.status(201).json(issue);
        })
        .catch(error => console.log({ error }));
      })
      .catch(error => console.log({ error }));
  });

IssuesRouter.route('/api/issues/:issueID')
  .all(authorization, (req, res, next) => {
    res.db = req.app.get('db');
    res.id = parseInt(req.params.issueID);
    IssuesService.getById(res.db, res.id)
      .then(issue => {
        if (!issue) next({message: 'Invalid data.'});
        issue = {
          id: res.id, name: xss(issue.name), description: xss(issue.description), 
          project_id: xss(issue.project_id), tools: xss(issue.tools), phase: xss(issue.phase),
          status: xss(issue.status), owner: xss(issue.owner), start_date: xss(issue.start_date), 
          collaboration: issue.collaboration, github: xss(issue.github)
        };
        res.issue = issue;
        next();
      });
  })
  .get((req, res) => {
    res.issue = {
      id: res.issue.id, name: xss(res.issue.name), description: xss(res.issue.description), 
      project_id: xss(res.issue.project_id), tools: xss(res.issue.tools), phase: xss(res.issue.phase),
      status: xss(res.issue.status), owner: xss(res.issue.owner), start_date: xss(res.issue.start_date), 
      collaboration: res.issue.collaboration, github: xss(res.issue.github)
    };
    return res.json(res.issue);
  })
  .patch((req, res) => {
    const {
      id, name, description, projectID, tools, phase, 
      status, owner, startDate, collaboration, github
    } = req.body;
    const values = {
      name: xss(name), description: xss(description), 
      project_id: xss(projectID), tools: xss(tools), phase: xss(phase),
      status: xss(status), owner: xss(owner), start_date: xss(startDate), 
      collaboration: collaboration, github: xss(github)
    };
    checkValues(res.db, values);
    Object.entries(values).forEach(([key, value]) => {
      if (!value) delete values[key];
    });
    IssuesService.editIssue(res.db, res.id, values)
      .then(issue => {
        issue = {
          name: xss(issue.name), description: xss(issue.description), 
          project_id: xss(issue.project_id), tools: xss(issue.tools), phase: xss(issue.phase),
          status: xss(issue.status), owner: xss(issue.owner), start_date: xss(issue.start_date), 
          collaboration: issue.collaboration, github: xss(issue.github)
        };
        return res.status(201).json(issue);
      });
  })
  .delete((req, res) => {
    IssuesService.deleteIssue(res.db, res.id)
      .then(() => res.status(301).end());
  });

module.exports = IssuesRouter;