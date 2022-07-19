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

  #addNewUser(username, password) {
    const details = { username, password };
    this.#content.users.push(details);
    return true;
  };

  addUser(username, password) {
    if (validateUsername(username) && username.length > 0) {
      if (this.getUsers().includes(username)) {
        return false;
      }
      console.log(this.#content.users);
      this.#addNewUser(username, password);
      console.log(this.#content);
      console.log(this.#content.users);
      return true;
    }
    return false;
  };
}

module.exports = { TODO };
