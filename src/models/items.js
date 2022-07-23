class Items {
  #items;
  constructor(items) {
    this.#items = items;
  }

  getNewItemId() {
    return this.#items[this.#items.length - 1].id + 1;
  }

  find(id) {
    return this.#items.find(item => item.id === id);
  }

  addItem(name, list) {
    const item = {
      id: this.getNewItemId(), name, list,
      done: false, deleted: false
    };
    this.#items.push(item);
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