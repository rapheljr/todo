const express = require('express');

const { homeHandler, handle404 } = require('./handlers/home.js');
const { loginHandler } = require('./handlers/login.js');
const { registerHandler } = require('./handlers/register.js');
const { logoutHandler } = require('./handlers/logout.js');
const { serveLogin, serveRegister } = require('./handlers/serve.js');
const { createApi } = require('./api.js');
const { setMiddleware } = require('./setMiddleware.js');

const createApp = (config) => {
  const { path, db } = config;

  const app = express();

  setMiddleware(app, config);

  app.get('/', homeHandler);
  const api = createApi(db);
  app.use('/api', api);
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
