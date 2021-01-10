const ProjectsService = {
  getProjects(db) {
    return db.from('projects')
      .select('*');
  }
  ,
  addProject(db, project) {
    return db.into('projects')
      .insert(project)
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  }
  ,
  editProject(db, id, values) {
    return db.from('projects')
      .select('*')
      .where('project_id', id)
      .update(values)
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  }
  ,
  deleteProject(db, id) {
    return db.from('projects')
      .where('project_id', id)
      .del();
  }
  ,
  getById(db, id) {
    return db.from('projects')
      .select('*')
      .where('project_id', id)
      .first();
  }
};

module.exports = ProjectsService;