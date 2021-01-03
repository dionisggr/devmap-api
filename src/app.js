require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const winston = require('winston');
const helmet = require('helmet');
const cors = require('cors');
// const validation = require('./validation');
const errorHandler = require('./error-handler');
const ProjectsRouter = require('./projects-router');
const IssuesRouter = require('./issues-router');
const UsersRouter = require('./users-router');
const LandingRouter = require('./landing-router');

const { NODE_ENV } = require('./config');

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

// app.use(validation);
app.use(LandingRouter);
app.use(ProjectsRouter);
app.use(IssuesRouter);
app.use(UsersRouter);
app.use(errorHandler);

module.exports = app;