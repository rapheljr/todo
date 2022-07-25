const lodash = require('lodash');

const { Users } = require('./users.js');
const { Lists } = require('./lists.js');
const { Items } = require('./items.js');

const includes = (text, letters) =>
  text.toLowerCase().includes(letters.toLowerCase());

const itemMatch = (list, key, status, open) => {
  list.items = list.items.filter(item => {
    if (status) {
      return includes(item.name, key) && item.done;
    }
    return includes(item.name, key);
  });
  if (list.items.length > 0) {
    open.push(list.id);
    return true;
  }
};

const titleMatch = (list, key, status, open) => {
  if (includes(list.title, key)) {
    if (status) {
      open.push(list.id);
      list.items = list.items.filter(item => {
        return includes(item.name, key) && item.done;
      });
      if (!list.items.length) {
        return false;
      }
    }
    return true;
  }
  return itemMatch(list, key, status, open);
};

class TODO {
  #content;
  #username;
  #users;
  #lists;
  #items;
  constructor(content, username) {
    this.#content = content;
    this.#username = username;
    this.#users = new Users(content.users);
    this.#lists = new Lists(content.lists);
    this.#items = new Items(content.items);
  }

  addUser(name, username, password) {
    return this.#users.addUser(name, username, password);
  }

  verifyUser(username, password) {
    return this.#users.verifyUser(username, password);
  }

  getDetails() {
    return this.#content;
  }

  getDetailsFrom() {
    return this.#users.find(this.#username);
  }

  getListsFrom() {
    const lists = this.#lists.getListsFrom(this.#username);
    lists.forEach(list => {
      const items = this.#items.getItemsFrom(list);
      list.items = items;
    });
    return lists;
  }

  getUserDetails() {
    const { id, name, username } = this.getDetailsFrom();
    const lists = this.getListsFrom();
    const details = {
      id, name, username, lists
    };
    return details;
  }

  getLastList() {
    const lists = this.getUserDetails().lists;
    const lastIndex = lists.length - 1;
    return [lists[lastIndex]];
  }

  getLastItem(id) {
    const lists = this.getUserDetails().lists;
    const theList = lists.find(list => list.id === id);
    const lastIndex = theList.items.length - 1;
    return [theList.items[lastIndex]];
  }

  addList(title) {
    this.#lists.addList(title, this.#username);
  }

  addItem(name, list) {
    this.#items.addItem(name, list);
  }

  markItem(id) {
    this.#items.markItem(id);
  }

  deleteItem(id) {
    this.#items.deleteItem(id);
  }

  deleteList(id) {
    this.#lists.deleteList(id);
  }

  editList(id, title) {
    this.#lists.editList(id, title);
  }

  editItem(id, name) {
    this.#items.editItem(id, name);
  }

  search(key, status) {
    const lists = this.getUserDetails().lists;
    const open = [];
    const filteredLists = lists.filter(list =>
      titleMatch(list, key, status, open));
    filteredLists.push(lodash.uniq(open));
    return filteredLists;
  }
}

module.exports = { TODO };
