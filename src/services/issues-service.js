const IssuesService = {
  getIssues(db) {
    return db.from('issues')
      .select('*');
  }
  ,
  addIssue(db, issue) {
    return db.into('issues')
      .insert(issue)
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  }
  ,
  editIssue(db, id, values) {
    return db.from('issues')
      .select('*')
      .where('issue_id', id)
      .update(values)
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  }
  ,
  deleteIssue(db, id) {
    return db.from('issues')
      .where('issue_id', id)
      .del();
  }
  ,
  getById(db, id) {
    return db.from('issues')
      .select('*')
      .where('issue_id', id)
      .first();
  }
};

module.exports = IssuesService;