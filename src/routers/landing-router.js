const express = require('express');
const LandingRouter = express.Router();

LandingRouter.route('/')
  .get((req, res) => {
    return res.sendFile('public/landing.html', {root: './'});
  });

module.exports = LandingRouter;