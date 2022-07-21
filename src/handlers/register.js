const { createSession } = require('./login.js');
const fs = require('fs');

const write = (req, file) => {
  const content = req.todo.getDetails();
  fs.writeFileSync(file, JSON.stringify(content));
};

const registerHandler = (db) =>
  (req, res) => {
    const { name } = req.body;
    const { username } = req.body;
    const { password } = req.body;
    if (req.todo.addUser(name, username.toLowerCase(), password)) {
      write(req, db);
      createSession(req, {});
      return res.redirect('/');
    }
    return res.end('Invalid username or password!');
  };

module.exports = { registerHandler, write };
