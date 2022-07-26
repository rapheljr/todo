const includes = (text, letters) =>
  text.toLowerCase().includes(letters.toLowerCase());

const itemMatch = (list, key, { done, undone }, open) => {
  list.items = list.items.filter(item => includes(item.name, key));
  const filtered = list.items.filter(item => {
    if (done) {
      return item.done;
    }
  });
  filtered.concat(list.items.filter(item => {
    if (undone) {
      return !item.done;
    }
  }));
  list.items = filtered;
  if (list.items.length > 0) {
    open.push(list.id);
    return true;
  }
};

const statusFilter = (list, key, { done, undone }, open) => {
  if (!includes(list.title, key)) {
    return itemMatch(list, key, { done, undone }, open);
  }
  if (done) {
    open.push(list.id);
    list.items = list.items
      .filter(item => includes(item.name, key) && item.done);
    if (!list.items.length) {
      return false;
    }
  }
  if (undone) {
    open.push(list.id);
    list.items = list.items
      .filter(item => includes(item.name, key) && !item.done);
    if (!list.items.length) {
      return false;
    }
  }
  return true;
};

const itemKeyMatch = (list, key, open) => {
  list.items = list.items.filter(item => includes(item.name, key));
  if (list.items.length) {
    open.push(list.id);
    return true;
  }
};

const keyFilter = (list, key, open) => {
  if (includes(list.title, key)) {
    return true;
  }
  return itemKeyMatch(list, key, open);
};
