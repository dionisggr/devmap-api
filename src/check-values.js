const UsersService = require('./users-service');
const ProjectsService = require('./projects-service');

function checkValues(db, values) {
  return Promise.all([
    UsersService.getUsers(db),
    ProjectsService.getProjects(db)
  ])
  .then(data => {
    const [ users, projects ] = data;
    const userFound = users.find(user => user.user_id === Number(values.owner));
    const projectFound = projects.find(project => project.project_id === Number(values.projectID));
    const phaseExists = 
      ['Planning', 'Design', 'Development', 'Testing', 'Ready']
        .includes(values.phase);
    const statusExists = 
      ['Pending', 'Delayed', 'In-Progress', 'Help']
        .includes(values.status);
    if (!userFound || !phaseExists || !statusExists || (values.projectID && !projectFound)) {
      throw new Error('Invalid data.');
    };
  });
};

module.exports = checkValues;