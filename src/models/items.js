class Items {
  #items;
  constructor(items) {
    this.#items = items;
  }

  getNewItemId() {
    return this.#items[this.#items.length - 1].id + 1;
  }

  addItem(name, list) {
    const item = {
      id: this.getNewItemId(), name, list,
      done: false, deleted: false
    };
    this.#items.push(item);
  }

  markItem(id) {
    const item = this.#items.find(item => item.id === id);
    item.done = !item.done;
  }

  deleteItem(id) {
    const item = this.#items.find(item => item.id === id);
    item.deleted = true;
  }

  getItemsFrom(list) {
    return this.#items.filter((item) =>
      list.id === item.list && item.deleted === false);
  }

}

module.exports = { Items };