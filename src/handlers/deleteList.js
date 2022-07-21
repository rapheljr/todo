const { write } = require('./register.js');

const deleteList = (db) =>
  (req, res) => {
    const { id } = req.body;
    req.todo.deleteList(+id);
    write(req, db);
    return res.json({ deleted: true });
  };

module.exports = { deleteList };
