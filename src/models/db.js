const { Users } = require('./users.js');
const { Lists } = require('./lists.js');
const { Items } = require('./items.js');

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
    return [lists[0]];
  }

  getLastItem() {
    return [this.#items.getLast()];
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
}

module.exports = { TODO };
