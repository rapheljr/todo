const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const { homeHandler, handle404 } = require('./handlers/home.js');
const { loginHandler } = require('./handlers/login.js');
const { registerHandler } = require('./handlers/register.js');
const { injectDB } = require('./middlewares/injectDB.js');
const { addList } = require('./handlers/addList.js');
const { addItem } = require('./handlers/addItem.js');

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
  app.post('/add-list', addList(db));
  app.post('/add-item', addItem(db));
  app.post('/login', loginHandler);
  app.post('/register', registerHandler(db));

  app.use(express.static(path));
  app.use(handle404);

  return app;
};

module.exports = { createApp };
