const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const { homeHandler } = require('./handlers/home.js');
const { loginHandler } = require('./handlers/login.js');
const { injectDB } = require('./middlewares/injectDB.js');

const createApp = (config) => {
  const { path, session, db, env } = config;

  const app = express();
  if (env === 'production') {
    app.use(morgan('tiny'));
  }
  app.use(express.urlencoded({ extended: true }));
  app.use(express.text());
  app.use(express.json());
  app.use(express.raw());

  app.use(cookieParser());
  app.use(cookieSession(session));
  app.use(injectDB(db));

  app.get('/', homeHandler);
  app.post('/login', loginHandler);

  app.use(express.static(path));

  return app;
};

module.exports = { createApp };
