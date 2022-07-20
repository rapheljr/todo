const { createSession } = require('./login.js');
const fs = require('fs');

const write = (req, file) => {
  const content = req.todo.getDetails();
  fs.writeFileSync(file, JSON.stringify(content));
};

const registerHandler = (db) =>
  (req, res, next) => {
    const { name } = req.body;
    const { username } = req.body;
    const { password } = req.body;
    if (req.todo.addUser(name.toLowerCase(), username.toLowerCase(), password)) {
      const content = req.todo.getDetails();
      write(req, db);
      createSession(req, {});
      return res.redirect('/');
    }
    return res.end('Invalid username or password!');
  };

module.exports = { registerHandler, write };
