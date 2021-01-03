const { API_KEY } = require('./config');

function validation(req, res, next) {
  const auth = req.get('Authorization');
  if (!auth || auth !== API_KEY) {
    res.status(401).json({error: 'Unauthorized access.'});
  };
  next();
};

module.exports = validation;