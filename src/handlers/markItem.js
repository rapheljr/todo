const { createHome } = require('../views/home.js');
const { write } = require('./register.js');

const markItem = (db) =>
  (req, res, next) => {
    const { id } = req.body;
    req.todo.markItem(+id);
    write(req, db);
    return res.json({ done: true });
  };

module.exports = { markItem };
