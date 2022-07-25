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

const titleMatch = (list, key, { done, undone }, open) => {
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

const titleKeyMatch = (list, key, open) => {
  if (includes(list.title, key)) {
    return true;
  }
  return itemKeyMatch(list, key, open);
};

let search;

const updateSearch = (XHR) => {
  search = searching(XHR.response);
};

const addNewSearch = () => {
  get('/api/lists', updateSearch);
};

const filterList = (replace) => {
  const lists = document.getElementById('lists');
  const [open] = replace.splice(-1);
  const list = createLists(replace);
  lists.replaceChildren(...list);
  open.forEach(openList);
};

const openList = (id) => {
  try {
    const list = document.getElementById(`title-${id}`);
    list.click();
  } catch (error) {
  }
};

const searching = (text) => () => {
  const open = [];
  const key = document.getElementById('search').value;
  const done = document.getElementById('done').checked;
  const undone = document.getElementById('undone').checked;
  const response = JSON.parse(text).filter(list => {
    if (done === undone) {
      return titleKeyMatch(list, key, open);
    }
    return titleMatch(list, key, { done, undone }, open);
  });
  response.push(open);
  filterList(response);
};
