const { write } = require('./register.js');

const deleteItem = (db) =>
  (req, res) => {
    const { id } = req.body;
    req.todo.deleteItem(+id);
    write(req, db);
    return res.json({ deleted: true });
  };

module.exports = { deleteItem };
