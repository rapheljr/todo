const express = require('express');

const { lists } = require('./handlers/lists.js');
const { addList } = require('./handlers/addList.js');
const { addItem } = require('./handlers/addItem.js');
const { markItem } = require('./handlers/markItem.js');
const { editList } = require('./handlers/editList.js');
const { editItem } = require('./handlers/editItem.js');
const { deleteList } = require('./handlers/deleteList.js');
const { deleteItem } = require('./handlers/deleteItem.js');
const { search } = require('./handlers/search.js');

const createApi = (db) => {
  const api = express.Router();

  api.get('/lists', lists);
  api.post('/add-list', addList(db));
  api.post('/add-item', addItem(db));
  api.post('/mark-item', markItem(db));
  api.post('/edit-list', editList(db));
  api.post('/edit-item', editItem(db));
  api.delete('/delete-list', deleteList(db));
  api.delete('/delete-item', deleteItem(db));
  api.post('/search', search);

  return api;
};

module.exports = { createApi };
