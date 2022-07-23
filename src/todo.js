const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const errorhandler = require('errorhandler');

const { homeHandler, handle404 } = require('./handlers/home.js');
const { loginHandler } = require('./handlers/login.js');
const { registerHandler } = require('./handlers/register.js');
const { injectDB } = require('./middleware/injectDB.js');
const { addList } = require('./handlers/addList.js');
const { addItem } = require('./handlers/addItem.js');
const { markItem } = require('./handlers/markItem.js');
const { deleteItem } = require('./handlers/deleteItem.js');
const { logoutHandler } = require('./handlers/logout.js');
const { deleteList } = require('./handlers/deleteList.js');
const { serveLogin, serveRegister } = require('./handlers/serve.js');
const { lists } = require('./handlers/lists.js');
const { editList } = require('./handlers/editList.js');

const createApp = (config) => {
  const { path, session, db, env } = config;

  const app = express();
  if (env === 'production') {
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

  app.get('/', homeHandler);
  app.get('/lists', lists);
  app.post('/add-list', addList(db));
  app.post('/edit-list', editList(db));
  app.post('/add-item', addItem(db));
  app.post('/mark-item', markItem(db));
  app.delete('/delete-item', deleteItem(db));
  app.delete('/delete-list', deleteList(db));
  app.post('/login', loginHandler);
  app.get('/logout', logoutHandler);
  app.post('/register', registerHandler(db));
  app.get(['/register', '/register.html'], serveRegister);
  app.get(['/login', '/login.html'], serveLogin);

  app.use(express.static(path));
  app.use(handle404);

  return app;
};

module.exports = { createApp };
