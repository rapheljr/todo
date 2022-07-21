const { write } = require('./register.js');

const addItem = (db) =>
  (req, res) => {
    const { list } = req.body;
    const { item } = req.body;
    req.todo.addItem(item, +list);
    write(req, db);
    return res.json(req.todo.getLastItem(+list));
  };

module.exports = { addItem };
