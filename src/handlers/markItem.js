const { createHome } = require('../views/home');
const { write } = require('./register.js');

const markItem = (db) =>
  (req, res, next) => {
    const { id } = req.body;
    req.todo.markItem(+id);
    write(req, db);
    const content = createHome(req.todo.getUserDetails());
    return res.end(content);
  };

module.exports = { markItem };
