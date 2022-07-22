const { Users } = require('./users.js');
class TODO {
  #content;
  #username;
  #users;
  constructor(content, username) {
    this.#content = content;
    this.#username = username;
    this.#users = new Users(content.users);
  }

  getNewListId() {
    return this.#content.lists[this.#content.lists.length - 1].id + 1;
  }

  getNewItemId() {
    return this.#content.items[this.#content.items.length - 1].id + 1;
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
    return this.#users.findUser(this.#username);
  }

  getListsFrom() {
    const lists = this.#content.lists.filter((list) =>
      list.username === this.#username && list.deleted === false);
    lists.forEach(list => {
      const items = this.#content.items.filter((item) =>
        list.id === item.list && item.deleted === false);
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
    const list = {
      id: this.getNewListId(), username: this.#username, title,
      done: false, deleted: false
    };
    this.#content.lists.push(list);
  }

  addItem(name, list) {
    const item = {
      id: this.getNewItemId(), name, list,
      done: false, deleted: false
    };
    this.#content.items.push(item);
  }

  markItem(id) {
    const item = this.#content.items.find(item => item.id === id);
    item.done = !item.done;
  }

  deleteItem(id) {
    const item = this.#content.items.find(item => item.id === id);
    item.deleted = true;
  }

  deleteList(id) {
    const list = this.#content.lists.find(list => list.id === id);
    list.deleted = true;
  }
}

module.exports = { TODO };
