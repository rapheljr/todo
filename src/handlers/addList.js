const { write } = require('./register.js');

const addList = (db) =>
  (req, res, next) => {
    const { title } = req.body;
    req.todo.addList(title);
    write(req, db);
    return res.json(req.todo.getLastList());
  };

module.exports = { addList };
