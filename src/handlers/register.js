const { createSession } = require('./login.js');
const fs = require('fs');

const write = (content, file) => {
  fs.writeFileSync(file, content);
};

const registerHandler = (db) =>
  (req, res, next) => {
    const { name } = req.body;
    const { username } = req.body;
    const { password } = req.body;
    if (req.todo.addUser(name.toLowerCase(), username.toLowerCase(), password)) {
      const content = req.todo.getDetails();
      write(JSON.stringify(content), db);
      createSession(req, {});
      return res.redirect('/home');
    }
    return res.end('Invalid username or password!');
  };

module.exports = { registerHandler };
