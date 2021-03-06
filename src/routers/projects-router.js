const express = require('express');
const UsersService = require('../services/users-service');
const ProjectsService = require('../services/projects-service');
const ToolsService = require('../services/tools-service');
const { authorization } = require('../middleware/validation');
const xss = require('xss');

const ProjectsRouter = express.Router();

ProjectsRouter.route('/api/projects')
  .get(async (req, res, next) => {
    const db = req.app.get('db');

    console.log('CONSOLE')

    const projects = await ProjectsService.getProjects(db)
      .catch(next);
    
    for (project of projects) {
      project.tools = await ToolsService.getProjectTools(db, project.project_id);
    };
    
    return res.json(projects);
  })
  .post(authorization, async (req, res, next) => {
    const db = req.app.get('db');

    const {
      name, user_id, description, phase, status, github, tools
    } = req.body;

    const project = {
      name, user_id, description, phase, status, github, tools
    };

    // Detect nulls and convert strings to XSS
    for (const [key, value] of Object.entries(project)) {
      if ( !value && (key !== 'description' || key !== 'github') ) {
        return res.status(400).send({ error: 'Missing values.' });
      }
      
      if (typeof value === 'string') {
        project[key] = xss(value);
      };
    };

    // Confirms the user exists
    const user = await UsersService.getById(db, project.user_id)
      .catch(next);
    
    if (!user) {
      return res.status(400).send({ error: 'Unauthorized action.' });
    }
    
    const newProject = await ProjectsService.addProject(db, project)
      .catch(next);
    
    tools.forEach(tool => {
      tool.project_id = newProject.project_id;
    });

    newProject.tools = tools;

    await ToolsService.addToProject(db, tools)
      .catch(next);
    
    return res.status(201).json(newProject);
  });

ProjectsRouter.route('/api/projects/:id')
  .all(authorization, async (req, _, next) => {
    const db = req.app.get('db');
    const project_id = parseInt(req.params.id);

    req.project = await ProjectsService.getById(db, project_id)
      .catch(next);
    
    next();
  })
  .get((req, res) => {
    return res.json(req.project);
  })
  .patch(async (req, res, next) => {
    const db = req.app.get('db');
    const { name, description, phase, status, github, tools } = req.body;
    const { project_id } = parseInt(req.project);

    const values = { name, description, phase, status, github, tools };

    for (const [key, value] of Object.entries(values)) {
      if (!value) {
        delete values[key];
      };
      
      if (typeof value === 'string') {
        values[key] = xss(value);
      };
    };

    const editedProject = await ProjectsService.editProject(db, project_id, values)
      .catch(next);
    
    const projectTools = await ToolsService.getProjectTools(db, project_id)
      .catch(next);
    
    editedProject.tools = projectTools;
    
    return res.json(editedProject);
  })
  .delete(async (req, res, next) => {
    const db = req.app.get('db');
    const { project_id } = req.project;

    await ProjectsService.deleteProject(db, project_id)
      .catch(next);
    
    return res.status(301).end();
  });

module.exports = ProjectsRouter;