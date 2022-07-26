const { createHash } = require('crypto');

const isUsernameValid = (username) => /^\w{0,}$/.test(username);

const validateUsername = (username) =>
  isUsernameValid(username) && username.length > 0;

const addSalt = text => text + 'sALT';

const getDigest = text => {
  const sha256 = createHash('sha256');
  sha256.update(addSalt(text));
  return sha256.digest('hex');
};

class Users {
  #users;
  #last;
  constructor(users) {
    this.#users = users;
    this.#last = users[0];
  }

  getUsers() {
    return this.#users.map((user) => user.username);
  }

  #getId() {
    return this.#users[0].id + 1;
  }

  #addNewUser(name, username, password) {
    this.#last = {
      id: this.#getId(), name, username, password: getDigest(password)
    };
    this.#users.unshift(this.#last);
    return true;
  }

  #validatePassword(username, password) {
    const user = this.find(username);
    if (user) {
      return user.password === getDigest(password);
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

module.exports = { Users, getDigest };
