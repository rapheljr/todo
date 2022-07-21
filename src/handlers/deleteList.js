const { createHome } = require('../views/home.js');
const { write } = require('./register.js');

const deleteList = (db) =>
  (req, res, next) => {
    const { id } = req.body;
    req.todo.deleteList(+id);
    write(req, db);
    return res.json({ deleted: true });
  };

module.exports = { deleteList };
