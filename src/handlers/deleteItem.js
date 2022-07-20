const { createHome } = require('../views/home.js');
const { write } = require('./register.js');

const deleteItem = (db) =>
  (req, res, next) => {
    const { id } = req.body;
    req.todo.deleteItem(+id);
    write(req, db);
    const content = createHome(req.todo.getUserDetails());
    return res.end(content);
  };

module.exports = { deleteItem };
