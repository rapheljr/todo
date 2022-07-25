class Lists {
  #lists;
  #last;
  constructor(lists) {
    this.#lists = lists;
    this.#last = lists[0];
  }

  find(id) {
    return this.#lists.find(list => list.id === id);
  }

  search(key) {
    return this.#lists.filter(list =>
      list.name.toLowerCase().includes(key.toLowerCase()));
  }

  #getId() {
    return this.#lists[0].id + 1;
  }

  getLast() {
    return this.#last;
  }

  getListsFrom(username) {
    return this.#lists.filter((list) =>
      list.username === username && list.deleted === false);
  }

  addList(title, username) {
    this.#last = {
      id: this.#getId(), username, title,
      done: false, deleted: false
    };
    this.#lists.unshift(this.#last);
  }

  deleteList(id) {
    const list = this.find(id);
    list.deleted = true;
  }

  editList(id, title) {
    const list = this.find(id);
    list.title = title;
  }

}

module.exports = { Lists };
