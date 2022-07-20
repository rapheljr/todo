const { createHome } = require('../views/home');
const { write } = require('./register.js');

const addItem = (db) =>
  (req, res, next) => {
    const { list } = req.body;
    const { item } = req.body;
    req.todo.addItem(item, +list);
    write(req, db);
    const content = createHome(req.todo.getUserDetails());
    return res.end(content);
  };

module.exports = { addItem };
