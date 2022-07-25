class Items {
  #items;
  #last;
  constructor(items) {
    this.#items = items;
    this.#last = items[0];
  }

  #getId() {
    return this.#items[0].id + 1;
  }

  getLast() {
    return this.#last;
  }

  find(id) {
    return this.#items.find(item => item.id === id);
  }

  search(key) {
    return this.#items.filter(item =>
      item.name.toLowerCase().includes(key.toLowerCase()));
  }

  addItem(name, list) {
    this.#last = {
      id: this.#getId(), name, list,
      done: false, deleted: false
    };
    this.#items.unshift(this.#last);
  }

  markItem(id) {
    const item = this.find(id);
    item.done = !item.done;
  }

  deleteItem(id) {
    const item = this.find(id);
    item.deleted = true;
  }

  editItem(id, name) {
    const item = this.find(id);
    item.name = name;
  }

  getItemsFrom(list) {
    return this.#items.filter((item) =>
      list.id === item.list && item.deleted === false);
  }

}

module.exports = { Items };
