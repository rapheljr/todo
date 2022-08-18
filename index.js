const { createApp } = require('./src/todo.js');
require('dotenv').config();

const main = () => {
  const { path, db, env, PORT, sessionKeys } = process.env;
  const config = {
    path, db, env,
    session: JSON.parse(sessionKeys),
  };
  const app = createApp(config);
  app.listen(+PORT, () =>
    console.log(`Server start at http://localhost:${PORT}`)
  );
};

main();
