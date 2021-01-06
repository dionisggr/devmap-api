const express = require('express');
const CollaboratorsService = require('./collaborators-service');
const CollaboratorsRouter = express.Router();
const xss = require('xss');

CollaboratorsRouter.route('/api/projects/:projectID/collaborators')
  .get((req, res) => {
    const db = req.app.get('db');
    const projectID = req.params.projectID;
    CollaboratorsService.getProjectCollaborators(db, projectID)
      .then(projects =>  res.json(projects))
      .catch(() => res.status(401).send({error: 'Could not get data.'}));
  });
CollaboratorsRouter.route('/api/issues/:issueID/collaborators')
  .get((req, res) => {
    const db = req.app.get('db');
    const issueID = req.params.issueID;
    CollaboratorsService.getIssueCollaborators(db, issueID)
      .then(issues =>  res.json(issues))
      .catch(() => res.status(401).send({error: 'Could not get data.'}));
  });

module.exports = CollaboratorsRouter;