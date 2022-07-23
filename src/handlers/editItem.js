const { write } = require('./register.js');

const editItem = (db) =>
  (req, res) => {
    const { id, item } = req.body;
    req.todo.editItem(+id, item);
    write(req, db);
    return res.json({ edited: true });
  };

module.exports = { editItem };
