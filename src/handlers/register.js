const { createSession } = require('./login.js');
const fs = require('fs');

const write = (req, file) => {
  const content = req.todo.getDetails();
  fs.writeFileSync(file, JSON.stringify(content));
};

const registerHandler = (db) =>
  (req, res) => {
    const { name, username, password } = req.body;
    if (req.todo.addUser(name, username, password)) {
      write(req, db);
      createSession(req, {});
      return res.redirect('/');
    }
    return res.redirect('/invalidUsername.html');
  };

module.exports = { registerHandler, write };
