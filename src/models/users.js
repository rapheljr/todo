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
    const user = this.find(username);
    if (user) {
      return user.password === password;
    }
    return false;
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
    return this.#validatePassword(username, password);
  }

  find(username) {
    return this.#users.find((user) => user.username === username);
  }

}

module.exports = { Users };
