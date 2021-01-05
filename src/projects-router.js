const express = require('express');
const checkValues = require('./check-values')
const ProjectsService = require('./projects-service');
const ProjectsRouter = express.Router();
const { authorization } = require('./validation');
const xss = require('xss');

ProjectsRouter.route('/projects')
  .all((req, res, next) => {
    res.db = req.app.get('db');
    next();
  })
  .get((req, res) => {
    ProjectsService.getProjects(res.db)
      .then(projects => {
        projects = projects.map(project => {
          project.id = project.project_id.toString();
          project.startDate = project.start_date;
          project = {
            id: xss(project.id), name: xss(project.name), description: xss(project.description), 
            tools: xss(project.tools), phase: xss(project.phase), status: xss(project.status),
            owner: xss(project.owner), startDate: xss(project.startDate),
            collaboration: project.collaboration, github: xss(project.github)
          };
          delete project.project_id;
          delete project.start_date;
          return project;
        });
        return res.json(projects);
      });
  })
  .post(authorization, (req, res, next) => {
    const {
      name, description, tools, phase, status, 
      owner, start_date, collaboration, github
    } = req.body;
    const newProject = {
      name: xss(name), description: xss(description), 
      tools: xss(tools), phase: xss(phase), status: xss(status),
      owner: xss(owner), start_date: xss(start_date),
      collaboration: collaboration, github: xss(github)
    };
    Object.entries(newProject).forEach(([_, value]) => {
      if (!value) next({message: 'Missing values.'});
    });
    checkValues(res.db, newProject)
      .then(() => 
        ProjectsService.addProject(res.db, newProject)
          .then(project => {
            project = {
              project_id: xss(project.project_id), name: xss(name), description: xss(description), 
              tools: xss(tools), phase: xss(phase), status: xss(status),
              owner: xss(owner), start_date: xss(start_date),
              collaboration: collaboration, github: xss(github)
            };
            return res.status(201).json(project);
          })
      );
  });

ProjectsRouter.route('/projects/:projectID')
  .all(authorization, (req, res, next) => {
    res.db = req.app.get('db');
    res.id = parseInt(req.params.projectID);
    ProjectsService.getById(res.db, res.id)
      .then(project => {
        if (!project) next({message: 'Invalid data.'});
        project = {
          id: project.project_id, name: xss(project.name), description: xss(project.description), 
          tools: xss(project.tools), phase: xss(project.phase), status: xss(project.status),
          owner: xss(project.owner), start_date: xss(project.start_date),
          collaboration: project.collaboration, github: xss(project.github)
        };
        res.project = project;
        next();
      });
  })
  .get((req, res) => {
    res.project = {
      id: res.project.id, name: xss(res.project.name), description: xss(res.project.description), 
      tools: xss(res.project.tools), phase: xss(res.project.phase), status: xss(res.project.status),
      owner: res.project.owner, start_date: xss(res.project.start_date),
      collaboration: res.project.collaboration, github: xss(res.project.github)
    };
    return res.json(res.project);
  })
  .patch((req, res) => {
    const {
      name, description, tools, phase, status, 
      owner, start_date, collaboration, github
    } = req.body;
    const values = {
      name: xss(name), description: xss(description), 
      tools: xss(tools), phase: xss(phase), status: xss(status),
      owner: xss(owner), start_date: xss(start_date),
      collaboration: collaboration, github: xss(github)
    };
    checkValues(res.db, values);
    Object.entries(values).forEach(([key, value]) => {
      if (!value) delete values[key];
    });
    ProjectsService.editProject(res.db, res.id, values)
      .then(project => res.status(201).json(project));
  })
  .delete((req, res) => {
    ProjectsService.deleteProject(res.db, res.id)
      .then(() => res.status(301).end());
  });

module.exports = ProjectsRouter;