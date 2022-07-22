class Lists {
  #lists;
  constructor(lists) {
    this.#lists = lists;
  }

  getNewListId() {
    return this.#lists[this.#lists.length - 1].id + 1;
  }

  getListsFrom(username) {
    return this.#lists.filter((list) =>
      list.username === username && list.deleted === false);
  }

  addList(title, username) {
    const list = {
      id: this.getNewListId(), username, title,
      done: false, deleted: false
    };
    this.#lists.push(list);
  }

  deleteList(id) {
    const list = this.#lists.find(list => list.id === id);
    list.deleted = true;
  }

}

module.exports = { Lists };
