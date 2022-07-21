const { createHome } = require('../views/home.js');
const { write } = require('./register.js');

const deleteItem = (db) =>
  (req, res, next) => {
    const { id } = req.body;
    req.todo.deleteItem(+id);
    write(req, db);
    return res.json({ done: true });
  };

module.exports = { deleteItem };
