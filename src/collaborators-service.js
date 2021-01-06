const CollaboratorsService = {
  getProjectCollaborators(db, projectID) {
    return db.from('project_collaborators')
      .select('*')
      .where('project_id', projectID);
  }
  ,
  getIssueCollaborators(db, issueID) {
    return db.from('issue_collaborators')
      .select('*')
      .where('issue_id', issueID);
  }
};

module.exports = CollaboratorsService;