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
      .select('tools.tool_id', 'name')
      .join('tools', { 'project_tools.tool_id': 'tools.tool_id' })
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