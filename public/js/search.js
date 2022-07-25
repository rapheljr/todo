const includes = (text, letters) =>
  text.toLowerCase().includes(letters.toLowerCase());

const itemMatch = (list, key, status, open) => {
  list.items = list.items
    .filter(item => includes(item.name, key))
    .filter(item => !status || item.done);

  if (list.items.length > 0) {
    open.push(list.id);
    return true;
  }
};

const titleMatch = (list, key, status, open) => {
  if (!includes(list.title, key)) {
    return itemMatch(list, key, status, open);
  }
  if (status) {
    open.push(list.id);
    list.items = list.items
      .filter(item => includes(item.name, key) && item.done);
    if (!list.items.length) {
      return false;
    }
  }
  return true;
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
  const search = document.getElementById('search');
  const status = document.getElementById('status');
  const stat = status.checked;
  const key = search.value;
  const response = JSON.parse(text).filter(list =>
    titleMatch(list, key, stat, open));
  response.push(open);
  filterList(response);
};
