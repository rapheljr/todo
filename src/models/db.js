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

  getNewId() {
    return this.#content.users[this.#content.users.length - 1].id + 1;
  }

  #addNewUser(name, username, password) {
    const details = {
      id: this.getNewId(), name, username, password
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
}

module.exports = { TODO };
