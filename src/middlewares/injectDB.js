const fs = require('fs');
const { TODO } = require('../models/db.js');

const injectDB = (db) => (req, res, next) => {
  const content = fs.readFileSync(db, 'utf-8');
  if (req.session.isPopulated) {
    req.todo = new TODO(JSON.parse(content), req.session.username);
    return next();
  }
  req.todo = new TODO(JSON.parse(content), '');
  return next();
};

module.exports = { injectDB };
