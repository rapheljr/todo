validateUsername = (username) => /^\w{0,}$/.test(username);

class TODO {
  #content;
  #username;
  constructor(content, username) {
    this.#content = content;
    this.#username = username;
  }

  getUsers() {
    return this.#content.users.map((user) => user.username);
  }

  getNewUserId() {
    return this.#content.users[this.#content.users.length - 1].id + 1;
  }

  getNewListId() {
    return this.#content.lists[this.#content.lists.length - 1].id + 1;
  }

  getNewItemId() {
    return this.#content.items[this.#content.items.length - 1].id + 1;
  }

  #addNewUser(name, username, password) {
    const details = {
      id: this.getNewUserId(), name, username, password
    };
    this.#content.users.push(details);
    return true;
  };

  #validatePassword(username, password) {
    const user = this.#content.users.filter((user) =>
      user.username === username);
    return user.password === password;
  }

  addUser(name, username, password) {
    if (validateUsername(username) && username.length > 0) {
      if (this.getUsers().includes(username)) {
        return false;
      }
      this.#addNewUser(name, username, password);
      return true;
    }
    return false;
  };

  verifyUser(username, password) {
    if (validateUsername(username) && username.length > 0) {
      return this.getUsers().includes(username);
    }
    return this.#validatePassword(username, password);
  };

  getDetails() {
    return this.#content;
  };

  getDetailsFrom() {
    return this.#content.users.find((user) => user.username === this.#username);
  }

  getListsFrom() {
    const lists = this.#content.lists.filter((list) =>
      list.username === this.#username);
    lists.forEach(list => {
      const items = this.#content.items.filter((item) =>
        list.id === item.list && item.deleted === false);
      list.items = items;
    })
    return lists;
  }

  getUserDetails() {
    const { id, name, username } = this.getDetailsFrom();
    const lists = this.getListsFrom();
    const details = {
      id, name, username, lists
    };
    return details;
  };

  addList(title) {
    const list = {
      id: this.getNewListId(), username: this.#username, title, done: false, deleted: false
    }
    this.#content.lists.push(list);
  };

  addItem(name, list) {
    const item = {
      id: this.getNewItemId(), name, list, done: false, deleted: false
    }
    this.#content.items.push(item);
  };

  markItem(id) {
    const item = this.#content.items.find(item => item.id === id);
    item.done = item.done ? false : true;
  }

  deleteItem(id) {
    const item = this.#content.items.find(item => item.id === id);
    item.deleted = true;
  }
}

module.exports = { TODO };
