const { NODE_ENV } = require('./config');

function errorHandler(error, req, res, next) {
  const response = 
    (NODE_ENV === 'production')
      ? {error: 'Server error.'}
      : console.log(error)
        && {message: error.message, error};
  res.status(500).json(response);
};

module.exports = errorHandler;