class Lists {
  #lists;
  constructor(lists) {
    this.#lists = lists;
  }

  find(id) {
    return this.#lists.find(list => list.id === id);
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
    const list = this.find(id);
    list.deleted = true;
  }

  editList(id, title) {
    const list = this.find(id);
    list.title = title;
  }

}

module.exports = { Lists };
