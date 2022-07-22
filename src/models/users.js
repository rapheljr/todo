const isUsernameValid = (username) => /^\w{0,}$/.test(username);

const validateUsername = (username) =>
  isUsernameValid(username) && username.length > 0;

class Users {
  #users;
  constructor(users) {
    this.#users = users;
  }

  getUsers() {
    return this.#users.map((user) => user.username);
  }

  #getNewUserId() {
    return this.#users[this.#users.length - 1].id + 1;
  }

  #addNewUser(name, username, password) {
    const details = {
      id: this.#getNewUserId(), name, username, password
    };
    this.#users.push(details);
    return true;
  }

  #validatePassword(username, password) {
    const user = this.#users.filter((user) =>
      user.username === username);
    return user.password === password;
  }

  addUser(name, username, password) {
    if (validateUsername(username)) {
      if (this.getUsers().includes(username)) {
        return false;
      }
      this.#addNewUser(name, username, password);
      return true;
    }
    return false;
  }

  verifyUser(username, password) {
    if (validateUsername(username)) {
      return this.getUsers().includes(username);
    }
    return this.#validatePassword(username, password);
  }

  findUser(username) {
    return this.#users.find((user) => user.username === username);
  }

}

module.exports = { Users };
