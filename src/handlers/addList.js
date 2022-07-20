const { createHome } = require('../views/home');
const { write } = require('./register.js');

const addList = (db) =>
  (req, res, next) => {
    const { title } = req.body;
    req.todo.addList(title);
    write(req, db);
    const content = createHome(req.todo.getUserDetails());
    return res.end(content);
  };

module.exports = { addList };
