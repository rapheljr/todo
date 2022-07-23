const { write } = require('./register.js');

const editList = (db) =>
  (req, res) => {
    const { id, title } = req.body;
    req.todo.editList(+id, title);
    write(req, db);
    return res.json({ edited: true });
  };

module.exports = { editList };
