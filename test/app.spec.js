const supertest = require('supertest');
const { expect } = require('chai');
const { createUsers, createProjects, createIssues } = require('./app.fixtures.js');
const { v4: uuid } = require('uuid');
const knex = require('knex');
const app = require('../src/app');
const UsersService = require('../src/users-service');
const ProjectsService = require('../src/projects-service');
const IssuesService = require('../src/issues-service');
const { TEST_DB_URL } = require('../src/config.js');

describe('The App', () => {
  const db = knex({
    client: 'pg',
    connection: TEST_DB_URL
  });
  
  app.set('db', db);
  
  before('cleaning tables', () => {
    return db.raw('TRUNCATE users, projects RESTART IDENTITY CASCADE');
  });
  
  after('disconnect from db', () => {
    return db.destroy();
  });
  context('renders Landing Page', () => {
    it('GET / responds with 200 status and an html page.', () => {
      return supertest(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /html/);
    });
  });
  context('User Data', () => {
    let random = uuid();
    let users;
    let user = {
      username: random,
      firstName: 'Dionis',
      lastName: 'Gonzalez',
      email: `${random}@gmail.com`,
      tools: "RESTful APIs",
      startDate: "2020-12-29T22:33:12.567Z",
      github: `github.com/${random}`,
      logged: false
    };
    before('inserting users to table', () => {
      users = createUsers();
      return db('users')
        .insert(users)
    });
    it('GET /users responds with 200 status and an array of objects.', () => {
      return supertest(app)
        .get('/users')
        .expect(200)
        .expect(res => expect(res.body).to.be.an('array'));
    });
    it('POST /users responds with 201 status and an object.', () => {
      return supertest(app)
        .post('/users')
        .send(user)
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('object');
          user.id = res.body.id;
          res.body.startDate = "2020-12-29T22:33:12.567Z";
          expect(res.body).to.eql(user);
          // res.body.startDate = 'Tue Dec 29 2020 22:33:12 GMT-0700 (Mountain Standard Time)'
        });
    });
    it('PATCH /users/:userID responds with 201 status and an object.', () => {
      const random = uuid();
      user.username = random;
      return supertest(app)
        .patch(`/users/${user.id}`)
        .send(user)
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('object');
        })
    });
    it('DELETE /users/:userID responds with 301 status.', () => {
      return supertest(app)
        .delete(`/users/${user.id}`)
        .expect(301);
    });
  });
  context('Project Data', () => {
    let random = uuid();
    let projects;
    let project = {
      name: "Project 1",
      description: "First description",
      tools: "HTML/CSS",
      phase: "Design",
      status: "Delayed",
      owner: 1,
      start_date: "2020-12-30T20:02:30.908Z",
      collaboration: true,
      github: "github.com/dionisggr/devmap"
    };
    before('inserting projects to table', () => {
      projects = createProjects();
      return db('projects')
        .insert(projects)
    });
    it('GET /projects responds with 200 status and an array of objects.', () => {
      return supertest(app)
        .get('/projects')
        .expect(200)
        .expect(res => expect(res.body).to.be.an('array'));
    });
    it('POST /projects responds with 201 status and an object.', () => {
      return supertest(app)
        .post('/projects')
        .send(project)
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('object');
          project.project_id = res.body.project_id;
          project.owner = res.body.owner.toString();
          expect(res.body).to.eql(project);
        });
    });
    it('PATCH /projects/:projectID responds with 201 status and an object.', () => {
      const random = uuid();
      project.name = random;
      return supertest(app)
        .patch(`/projects/${project.project_id}`)
        .send(project)
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('object');
        })
    });
    it('DELETE /projects/:projectID responds with 301 status.', () => {
      return supertest(app)
        .delete(`/projects/${project.project_id}`)
        .expect(301);
    });
  });
  context('Issue Data', () => {
    let random = uuid();
    let issues;
    let issue = {
      name: "Issue 1",
      description: "First description",
      tools: "HTML/CSS",
      phase: "Design",
      status: "Delayed",
      owner: 1,
      start_date: "2020-12-30T20:02:30.908Z",
      project_id: 1,
      collaboration: true,
      github: "github.com/dionisggr/devmap"
    };
    before('inserting issues to table', () => {
      issues = createIssues();
      return db('issues')
        .insert(issues)
    });
    it('GET /issues responds with 200 status and an array of objects.', () => {
      return supertest(app)
        .get('/issues')
        .expect(200)
        .expect(res => expect(res.body).to.be.an('array'));
    });
    it('POST /issues responds with 201 status and an object.', () => {
      return supertest(app)
        .post('/issues')
        .send(issue)
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('object');
          issue.issue_id = res.body.issue_id;
          issue.owner = res.body.owner.toString();
          res.body.start_date = "2020-12-30T20:02:30.908Z";
          expect(res.body).to.eql(issue);
        });
    });
    it('PATCH /issues/:issueID responds with 201 status and an object.', () => {
      const random = uuid();
      issue.name = random;
      return supertest(app)
        .patch(`/issues/${issue.issue_id}`)
        .send(issue)
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('object');
        })
    });
    it('DELETE /issues/:issueID responds with 301 status.', () => {
      return supertest(app)
        .delete(`/issues/${issue.issue_id}`)
        .expect(301);
    });
  });
});

