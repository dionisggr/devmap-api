const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const winston = require('winston');
const { NODE_ENV } = require('./config');
const ProjectsRouter = require('./routers/projects-router');
const IssuesRouter = require('./routers/issues-router');
const UsersRouter = require('./routers/users-router');
const LandingRouter = require('./routers/landing-router');
const AccessRouter = require('./routers/access-router');
const errorHandler = require('./middleware/error-handler');

const app = express();
const morganOption =
  (NODE_ENV === 'production' || NODE_ENV === 'test')
    ? 'tiny'
    : 'common';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({filename: 'info.log'})
  ]
});
if (NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
};

app.use(helmet());
app.use(cors());
app.use(morgan(morganOption));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.use(AccessRouter);
app.use(LandingRouter);
app.use(ProjectsRouter);
app.use(IssuesRouter);
app.use(UsersRouter);
app.use(errorHandler);

module.exports = app;