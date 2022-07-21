const { createApp } = require('./src/todo.js');
const fs = require('fs');

const main = () => {
  const key = fs.readFileSync('./db/keys.json', 'utf-8');
  const config = {
    path: 'public',
    db: './db/todo.json',
    session: JSON.parse(key),
    env: 'production'
  };
  const app = createApp(config);
  const PORT = 8000;
  app.listen(PORT, () => console.log('App started listening', PORT));
};

main();
