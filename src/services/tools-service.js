const ToolsService = {
  addToProject: (db, tools) => {
    return db.from('project_tools')
      .insert(tools);
  }
  ,
  addToUser: (db, tools) => {
    return db.from('user_tools')
      .insert(tools);
  }
  ,
  getProjectTools: (db, project_id) => {
    return db.from('project_tools')
      .select('*')
      .where({ project_id })
  }
  ,
  getUserTools: (db, user_id) => {
    return db.from('user_tools')
      .select('*')
      .where({ user_id })
  }
};

module.exports = ToolsService;