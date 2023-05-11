const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const errorhandler = require('errorhandler');

const { injectDB } = require('./middleware/injectDB.js');

const setMiddleware = (app, config) => {
  const { session, db, env } = config;

  if (env === 'prod') {
    app.use(morgan('tiny'));
    app.use(errorhandler());
  }
  app.use(express.urlencoded({ extended: true }));
  app.use(express.text());
  app.use(express.json());
  app.use(express.raw());

  app.use(cookieParser());
  app.use(cookieSession(session));
  app.use(injectDB(db));

  return app;
};

module.exports = { setMiddleware };
