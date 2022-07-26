let search;

const updateSearch = (XHR) => {
  search = searching(XHR.response);
};

const addNewSearch = () => {
  GET('/api/lists', updateSearch);
};

const openList = (id) => {
  try {
    const list = document.getElementById(`title-${id}`);
    list.click();
  } catch (error) {
  }
};

const filterList = (replace, key) => {
  const lists = document.getElementById('lists');
  const [open] = replace.splice(-1);
  const list = createLists(replace, key);
  lists.replaceChildren(...list);
  open.forEach(openList);
};

const searching = (text) => () => {
  const open = [];
  const key = document.getElementById('search').value;
  const done = document.getElementById('done').checked;
  const undone = document.getElementById('undone').checked;
  const response = JSON.parse(text).filter(list => {
    if (done === undone) {
      return keyFilter(list, key, open);
    }
    return statusFilter(list, key, { done, undone }, open);
  });
  response.push(open);
  filterList(response, key);
};
