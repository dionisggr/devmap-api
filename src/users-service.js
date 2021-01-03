const UsersService = {
  getUsers(db) {
    return db.from('users')
      .select('*');
  }
  ,
  addUser(db, user) {
    return db('users')
      .insert(user)
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  }
  ,
  editUser(db, id, values) {
    return db.from('users')
      .select('*')
      .where('user_id', id)
      .update(values)
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  }
  ,
  deleteUser(db, id) {
    return db.from('users')
      .where('user_id', id)
      .del();
  }
  ,
  getById(db, id) {
    return db.from('users')
      .select('*')
      .where('user_id', id)
      .first();
  }
};

module.exports = UsersService;